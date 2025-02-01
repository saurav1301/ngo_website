import React, { useState } from 'react';
import '../styles/Event.css';
import {getEvents} from '../firebase/firebase'
import { useEffect } from 'react';
import volunteerImage from '../assets/images/volunteer.jpg';
import Footer from '../components/Footer'; 


const EventPage = () => {
  
  const [events, setEvents] = useState([]);
  const[upcomingevents,setupcomingevents]=useState([])
  const[pastevents,setpastevents]=useState([])

  function getIndianDate() {
    const indiaTimeZone = new Date().toLocaleDateString("en-CA", { // 'en-CA' gives YYYY-MM-DD format
      timeZone: "Asia/Kolkata",
    });
    return indiaTimeZone;
  }
  function LessDate(date1, date2) {
    // Convert the date strings into Date objects
    const firstDate = new Date(date1);
    const secondDate = new Date(date2);
  
    // Compare the two dates
    return firstDate < secondDate;
  }
  function Greaterdate(date1, date2) {
    // Convert the date strings into Date objects
    const firstDate = new Date(date1);
    const secondDate = new Date(date2);
  
    // Compare the two dates
    return firstDate > secondDate;
  }
  const upevents=[]
  const pasteve=[]
  const [done,setdone]=useState(false)
    useEffect(()=>{
    async function getdata(params) {
      const data = await getEvents()
      const result =[]
      data.forEach((doc) => {
        const subcontent = doc.data()
        console.log("########",subcontent)
        result.push({id:doc.id,title:subcontent.title,location:subcontent.location,description:subcontent.description,imageurl:subcontent.imageurl,startdate:subcontent.startdate,enddate:subcontent.enddate})
        // console.log(`${doc.id} => `, doc.data());
        });
        console.log(result)
        setEvents(result)
        setdone(true)
    }
    getdata()
  },[])
  useEffect(()=>{
    const currdate = getIndianDate()
    console.log(currdate)
    console.log(events.length)
    for(let i=0;i<=events.length-1;i++){
      console.log(LessDate(events[i].enddate,currdate))
      console.log(events[i].enddate)
      console.log(currdate)
      var l=LessDate(events[i].enddate,currdate)
      var g=Greaterdate(events[i].enddate , currdate)
      console.log("1",l)
      console.log("g",g)
      if(l===true){
        // setpastevents(...pastevents,events[i])
        pasteve.push(events[i])
        console.log("@@@@@@@@@@@@@@@@@@@",events[i])
      }
      if(g===true){
        // setupcomingevents(...upcomingevents,events[i])
        upevents.push(events[i])
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",events[i])
      }
    }
    console.log("upcomingevents",upevents)
    console.log("pastevents",pasteve)
    setupcomingevents(upevents)
    setpastevents(pasteve)
  },[done])
  return (
    <div className="event-page">
      {/* Page Header */}
      <header className="event-header">
        <h1>Our Events</h1>
        <p>"Every child deserves a chance to grow up with love, care, and 
          the opportunity to reach their full potential. Unfortunately, millions of children
           around the world are deprived of these basic rights, struggling with hunger, lack of education, 
           and inadequate healthcare. At HelpCare NGO, we are committed to changing this reality by
            providing essential support to underprivileged children. Your donation can make a significant
             impact—helping us to feed, educate, and care for those who need it most. Together, we can break
              the cycle of poverty and give these children a brighter future. Join us in this mission of hope
               and change; your generosity can transform lives today."

        </p>
      </header>

      {/* Upcoming Events Section */}
      <section className="event-card">
        <h2>Upcoming Events</h2>
        {/* <div className="event-cards">
        <div className="event-card"> */}
        <div className="cards">
        {upcomingevents.length > 0 ? (
            upcomingevents.map( event => (
              <div key={event.id} className="storyupcoming">
                <img src={event.imageurl} alt="" srcset=""  width="100px" height="100px"/>
                <div className="storyupcontent">
                <h3>{event.title}</h3>
                <h4>location : {event.location}</h4>
                <h4>start date : {event.startdate}</h4>
                <h4>end date : {event.enddate}</h4>
                <h5>Descrption : {event.description}</h5>
                <a href="/donate" className="donate-button">Donate</a>
                </div>
                {/* <button onClick={() => handleDelete(story.id)} className="delete-button">Delete</button> */}
              </div>
            ))
          ) : (
            <p>No stories yet. Be the first to share your story!</p>
          )}
        </div>
          {/* </div>
          
        </div> */}
      </section>

      {/* Past Events Section */}
      <section className="past-events">
        <h2>Past Events</h2>
        
        <div className="pastcard">
        {pastevents.length > 0 ? (
            pastevents.map(event => (
              <div key={event.id} className="story-boxs">
                <img src={event.imageurl} alt="" srcset=""  width="100px" height="100px" />
                <h3>Title:{event.title}</h3>
                <h4>location:{event.location}</h4>
                <h4>start date:{event.startdate}</h4>
                <h4>end date:{event.enddate}</h4>
                <h5>Descrption:{event.description}</h5>
                {/* <button onClick={() => handleDelete(story.id)} className="delete-button">Delete</button> */}
              </div>
            ))
          ) : (
            <p>No stories yet. Be the first to share your story!</p>
          )}
        </div>
         

      </section>
      
      {/*involved section*/}
      <div className="join-us-section">
        <h2>Get Involved</h2>
        <img src={volunteerImage} alt="Join Us" className="volunteer-img" />
        <p className="join-reason">
          Volunteering with HelpCare NGO provides you with the opportunity to make a real difference in the lives of those in need. Your time and skills will help us bring positive change and impact to the community. Join us and be a part of our mission to create a better world.
        </p>
        <a href="/volunteer" className="volunteer-button"> Join Us Today</a>
      </div>

      {/* Footer */}
      <div>
      <Footer/>
      </div>
    </div>
  );
};

export default EventPage;
