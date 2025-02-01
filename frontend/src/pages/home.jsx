import React, { useEffect, useState } from 'react';
import '../styles/home.css';
import ImageSlider from '../components/Imageslider';
import motherTeresaImage from '../assets/images/Mother-Teresa.jpg';
import volunteerImage from '../assets/images/volunteer.jpg';
import { FaDollarSign, FaTasks, FaUsers, FaHandsHelping } from 'react-icons/fa';
import { addData, getAllData, deleteSpecificData, getAllVolunteer } from '../firebase/firebase';
import Footer from '../components/Footer'; 

const Home = () => {
  const [allstories, setAllStories] = useState([]);
  const [allvolunteer, setAllVolunteer] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      const achievementsSection = document.querySelector('.achievements-box');
      const rect = achievementsSection.getBoundingClientRect();
      const inViewport = rect.top >= 0 && rect.left >= 0 && rect.bottom <= window.innerHeight && rect.right <= window.innerWidth;

      if (inViewport) {
        const counts = document.querySelectorAll('.count');
        counts.forEach(count => {
          const target = +count.getAttribute('data-count');
          let current = 0;
          const increment = target / 100;
          const updateCount = () => {
            if (current < target) {
              current += increment;
              count.innerText = Math.ceil(current);
              setTimeout(updateCount, 10);
            } else {
              count.innerText = target;
            }
          };
          updateCount();
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger on initial load

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    async function getData() {
      const data = await getAllData();
      const result = [];
      data.forEach((doc) => {
        const subcontent = doc.data();
        result.push({ id: doc.id, title: subcontent.title, story: subcontent.story });
      });

      const final_result = result.length > 3 ? result.slice(0, 3) : result;
      setAllStories(final_result);

      const voldata = await getAllVolunteer();
      const volresult = [];
      voldata.forEach((doc) => {
        const subcontent = doc.data();
        volresult.push({ id: doc.id, name: subcontent.name, email: subcontent.email, phone: subcontent.phone });
      });
      setAllVolunteer(volresult);
    }
    getData();
  }, []);

  const truncateContent = (content) => {
    const words = content.split(' ');
    return words.length > 20 ? words.slice(0, 20).join(' ') + '...' : content;
  };

  return (
    <div className="home">
      <div className="hero-container">
        <ImageSlider />
        <div className="welcome-message">
          <h1>Welcome to HelpCare NGO</h1>
          <p className="quote">"Every child deserves a chance to smile and be happy. Let's make it happen."</p>
          <a href="/donate" className="donate-button">Donate Now</a>
        </div>
        <div className="left-quote">
          <h1>"The best way to find yourself is to lose yourself in the service of others."</h1>
          <h4>-- Mahatma Gandhi</h4>
        </div>
      </div>

      <div className="impact">
        <h2>Our Impact</h2>
        <div className="impact-stories">
          {allstories.length > 0 ? (
            allstories.map(story => (
              <div key={story.id} className="story">
                <h3>{story.title}</h3>
                <p>{truncateContent(story.story)}</p>
              </div>
            ))
          ) : (
            <p>No stories yet. Be the first to share your story!</p>
          )}
          <a href="/impact" className="view-more">View More</a>
        </div>
      </div>

      <div className="mother-teresa-section">
        <img src={motherTeresaImage} alt="Mother Teresa" className="mother-teresa-img" />
        <div className="mother-teresa-quote">
          <p>
          "We ourselves feel that what we are doing is just a drop in the ocean. But the ocean would be less because of that missing drop. It's not how much we give but how much love we put into giving. Spread love everywhere you go. Let no one ever come to you without leaving happier."
          </p>
        </div>
      </div>

      <div className="join-us-section">
        <h2>Be the change you wish to see in the world</h2>
        <img src={volunteerImage} alt="Join Us" className="volunteer-img" />
        <p className="join-reason">
           Volunteering with HelpCare NGO provides you with the opportunity to make a real difference in the lives of those in need. Your time and skills will help us bring positive change and impact to the community. Join us and be a part of our mission to create a better world. Together, we can provide hope, happiness, and opportunities to those who need it most.
        </p>
        <a href="/volunteer" className="volunteer-button">Join Us Today</a>
      </div>

      <div className="achievements-section">
        <div className="achievements-box">
          <div className="achievements-content">
            <div className="achievement">
              <FaDollarSign className="icon" />
              <div className="text">
                <h3 className="count" data-count="100000">0</h3>
                <p>Funds Raised</p>
              </div>
            </div>
            <div className="achievement">
              <FaTasks className="icon" />
              <div className="text">
                <h3 className="count" data-count="100">0</h3>
                <p>Projects Done</p>
              </div>
            </div>
            <div className="achievement">
              <FaUsers className="icon" />
              <div className="text">
                <h3 className="count" data-count={allvolunteer.length}>0</h3>
                <p>Volunteers</p>
              </div>
            </div>
            <div className="achievement">
              <FaHandsHelping className="icon" />
              <div className="text">
                <h3 className="count" data-count="250">0</h3>
                <p>People Helped</p>
              </div>
            </div>
          </div>
        </div>
        <div className="achievements-text">
          <h2>What We Have Achieved</h2>
          <p>
          Through the collective efforts of our team and supporters, we have made significant strides in improving lives and creating positive change. Our accomplishments are a testament to the power of community and dedication. We continue to work tirelessly toward our mission of supporting those in need and building a better future for everyone. With the help of generous donors, committed volunteers, and passionate team members, we aim to create lasting change in the communities we serve.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
