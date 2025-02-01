import express from "express";
import cors from 'cors';
import nodemailer from 'nodemailer'
import Stripe from 'stripe'; // Import Stripe library

const app = express()
const stripe = new Stripe('sk_test_51Q55lxB6pbsjje06E5RFMXhoa1Bk9BHKlMsiDOD5cCI0ewR114MbtbIGWXvESAoh1NDK3GYYNivuno1O738XCft000qYMjVNug'); 

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('server is ready')
})

app.get('/api/jokes',(req,res)=>{
    const jokes =[{id:1},{id:2}]
    res.send(jokes)
})

app.post('/create-checkout-session', async (req, res) => {
  const { name, email, amount } = req.body;

  try {
    // Create a new checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Donation by ${name}`,
            },
            unit_amount: amount * 100, // Convert amount to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:5173/success', // Redirect after successful payment
      cancel_url: 'http://localhost:5173/donate', // Redirect if payment is cancelled
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: 'Payment failed. Please try again.' });
  }
});

app.post('/api/submit', (req, res) => {
    const {name,email,phone,address,availability} = req.body;
    console.log('Form data received:', { name, email,phone,address,availability });
    
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for port 465, false for other ports
        auth: {
          user: "saurav1301negi@gmail.com",
          pass: "uvdn niro pkmg kvig",
        },
      });
      
      // Set up email data
      const mailOptions = {
        from: 'saurav1301negi@gmail.com',       // Sender address
        to: email,        // List of recipients
        subject: 'Hello from NGO',   // Subject line
        message:`Hello welcome ${name}`
      };
       
      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
      });
    res.json({ message: 'Form submitted successfully!', data: { name, email, phone,address,availability} });
  });

const port = process.env.PORT || 5000

app.listen(port,()=>{
    console.log(`server is listening on http://localhost:${port}`)
})