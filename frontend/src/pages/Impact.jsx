// src/pages/Impact.js

import React, { useState } from 'react';
import '../styles/Impact.css'; // Import your CSS file for styling
import Modal from 'react-modal';
import work1 from '../assets/images/work1.jpg';
import work2 from '../assets/images/work2.jpg';
import work3 from '../assets/images/work3.jpg';
import work4 from '../assets/images/work4.jpg';
import {addData,getAllData,deleteSpecificData} from '../firebase/firebase'
import { useEffect } from 'react';
import Footer from '../components/Footer'; 
Modal.setAppElement('#root');

const ImpactPage = () => {
  const [stories, setStories] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [newStory, setNewStory] = useState({ title: '', content: '' });
  const [impactdelete,setdelete]=useState(false)
  const[impactadded,setimpactadded]=useState(false)

  const openModal = (content) => {
    setModalContent(content);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalContent('');
  };

  const handleDelete = async(id) => {
      await deleteSpecificData(id)
      setdelete(true)
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStory({ ...newStory, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newStory.title && newStory.content) {
      await addData({title:newStory.title,story:newStory.content})
      setimpactadded(true)
      // setStories([...stories, { id: Date.now(), ...newStory }]);
      setNewStory({ title: '', content: '' });
    }
  };

  const truncateContent = (content) => {
    const words = content.split(' ');
    return words.length > 20 ? words.slice(0, 20).join(' ') + '...' : content;
  };

  const [allstories,setallstories]=useState([])
  useEffect(()=>{
    async function d(params) {
      const data = await getAllData()
      console.log("@@@@@@@@@@@@@@@",data)
    }
    d()
  },[])
  useEffect(()=>{
    async function getdata(params) {
      const data = await getAllData()
      const result =[]
      data.forEach((doc) => {
        const subcontent = doc.data()
        console.log("########",subcontent)
        result.push({id:doc.id,title:subcontent.title,story:subcontent.story})
        // console.log(`${doc.id} => `, doc.data());
        });
        console.log("*************",result)
        const final_result=[]
        if(result.length<=4){
            console.log("%%%%%%%%%%%%%%%%%%%%%%%")
            setallstories(result)
        }
        if(result.length>4){
          console.log("&&&&&&&&&&&&&&&&&&&&&&&",result.length)
          for(let i=0 ; i<=10;i++){
              console.log(i)
                final_result.push(result[i])
                console.log("^^^^^^^^^^^",result[i])
          }
          setallstories(final_result)
        }
        // const final_result=[]
        // if(result.length<=4){
        //   setallstories(result)
        // }
        // else{
        //   for(let i=result.length-4 ; i<=result.length;i++){
        //     final_result.push(result[i])
        //   }
        //   setallstories(final_result)
        // }
    }
    getdata()
  },[impactdelete,impactadded])
  return (
    <div className="impact-page">
      {/* Header Section */}
      <header className="impact-header">
        <h1>Our Impact</h1>
        <p>See the difference we're making in the lives of those in need.</p>
      </header>

      {/* Impact Metrics Section */}
      <section className="impact-metrics">
        <div className="metric-box">
          <h2>500+</h2>
          <p>Children Educated</p>
        </div>
        <div className="metric-box">
          <h2>$1M+</h2>
          <p>Funds Raised</p>
        </div>
        <div className="metric-box">
          <h2>300+</h2>
          <p>Volunteers Engaged</p>
        </div>
        <div className="metric-box">
          <h2>100+</h2>
          <p>Communities Reached</p>
        </div>
      </section>

      {/* Impact Stories Section */}
      <h2>Impact Stories</h2>
      <section className="impact-stories">
      <div className="story-list">
          {allstories.length > 0 ? (
            allstories.map(story => (
              <div key={story.id} className="story-box">
                <h3>{story.title}</h3>  
                <p>{truncateContent(story.story)}</p>
                <button onClick={() => openModal(story.story)}>Read More</button>
                {/* <button onClick={() => handleDelete(story.id)} className="delete-button">Delete</button> */}
              </div>
            ))
          ) : (
            <p>No stories yet. Be the first to share your story!</p>
          )}
        </div>
      </section>

      {/* Share Your Story Section */}
      <section className="share-your-story">
        <h2>Share Your Story</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={newStory.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Story</label>
            <textarea
              id="content"
              name="content"
              value={newStory.content}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </section>

      {/* Gallery Section */}
      <section className="impact-gallery">
        <h2>Our Work in Action</h2>
        <div className="gallery-grid">
          <img src={work1} alt="Gallery Image 1" />
          <img src={work2} alt="Gallery Image 2" />
          <img src={work3} alt="Gallery Image 3" />
          <img src={work4} alt="Gallery Image 4" />
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="impact-cta">
        <h2>Join Us in Making a Difference</h2>
        <p>Your support can help us reach more people and create a bigger impact.</p>
        <a href="/volunteer" className="cta-button">Get Involved</a>
      </section>

      {/* Thank You Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Impact Story"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Impact Story</h2>
        <p>{modalContent}</p>
        <button onClick={closeModal} className="modal-close-button">Close</button>
      </Modal>

      {/* Footer */}
      <div>
      <Footer/>
      </div>
    </div>
  );
};

export default ImpactPage;
