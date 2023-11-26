import { useState,useEffect, Fragment, useContext} from "react";
import { createClient } from 'pexels';
import "../Style/Pictures.css";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import {GrDownload} from "react-icons/gr";
import { Container } from "./Navbar";
import BottomBg from "./bottom img.jpg";
import {AiFillLinkedin,AiOutlineTwitter,AiFillGithub} from "react-icons/ai"


const client = createClient('Bptfdr3SWwifXyj51dHU4fKFMgp1Q6cP0Z1U0lNHRmb8ihMx673SLtP8');

function Pictures() {
  const [curatedPhotos,setCuratedPhotos] = useState([]);
  const [searchPhotos, setSearchPhotos] = useState([]);
  const [hoveredPhotos,setHoveredPhotos] = useState(null);
  const {toggle,searchQuery} = useContext(Container);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);
  
   useEffect(() => {
    client.photos.curated({ per_page : 63})
      .then(response => {
        setCuratedPhotos(response.photos);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

   useEffect(() => {
    client.photos.search({query: searchQuery, per_page : 63})
      .then(response => {
        setSearchPhotos(response.photos);
      })
      .catch(error => {
        console.error(error);
      });
  }, [searchQuery]);

    function handleDownload(sourceUrl){
        const link = document.createElement("a");
        link.href = sourceUrl;
         link.download = "photos.jpg";
        link.click();
    }

    function handleHover(photoId) {
      setHoveredPhotos(photoId);
    }

    function handleLeave() {
      setHoveredPhotos(null);
    }

  return (
    <Fragment>
      <div id={toggle? "secondaryBgColor" : "mainBgColor"}>
         <h1>Free Stock Photos</h1>
      <div>
      {loading ? ( // Render loading spinner if loading is true
      <div className="loading-spinner"></div>
       ) : (
      <div className="pictures_container">
      {searchPhotos.map(photo => {
        return (
          <ul>
            <li key={photo.id}
              onMouseEnter={() => handleHover(photo.id)}
              onMouseLeave={handleLeave}>
              <div className="image_container">
              <LazyLoadImage
                effect="opacity"
                src={photo.src.original}
                alt={photo.photographer}
                width={photo.width / 11}
                height={photo.height / 11}
                style={{ cursor: "pointer" }} />

                {hoveredPhotos === photo.id &&  (
             <div className="more_info">
              <div className="info">
                  <p>{photo.photographer}</p>
                  <button
                  className="download-button"
                  onClick={() => handleDownload(photo.src.original)}>
                  <GrDownload fontSize={20} />
                  </button>
              </div>
            </div>
           )}
           </div>
            </li>
          </ul>
        );
      })}  
    </div>
      )}
    </div>

    <div>
    {loading ? ( // Render loading spinner if loading is true
     <div className="loading-spinner"></div>
       ) : (
    <div className="pictures_container" >
      {curatedPhotos.map(photo => {
        return (
          <ul>
            <li key={photo.id}
              onMouseEnter={() => handleHover(photo.id)}
              onMouseLeave={handleLeave}
            >
              <div className="image_container">
              <LazyLoadImage
                effect="opacity"
                src={photo.src.original}
                alt={photo.photographer}
                width={photo.width / 11}
                height={photo.height / 11}
                style={{ cursor: "pointer" }} />

                {hoveredPhotos === photo.id &&  (
             <div className="more_info">
              <div className="info">
                  <p>{photo.photographer}</p>
                  <button
                  className="download-button"
                  onClick={() => handleDownload(photo.src.original)}>
                  <GrDownload fontSize={20} />
                  </button>
              </div>
            </div>
           )}
           </div>
            </li>
          </ul>
        );
      })}
    </div>
    )}
    </div>
    </div>
    

      <div className="bottom_bg">
         <img src={BottomBg} width="100%"  height="350px" alt="BottomBg"/>
         <div className="profile_link">
          <div className="contact">
             <h2>Connect Us</h2>
          </div>
          <div className="profile">
         <a href="https://www.linkedin.com/in/ugochukwu-emmanuel-ba798a25a/">
           <AiFillLinkedin color="#0072b1" fontSize={30} cursor="pointer"  fontWeight="bolder"/>
         </a>
          <a href="https://twitter.com/9Gunna9">
            <AiOutlineTwitter color="	#1DA1F2" fontSize={30} fontWeight="bolder"/>
          </a>
         <a href="https://github.com/Dev-Emmyy">
            <AiFillGithub color="black" fontSize={30} cursor="pointer"  fontWeight="bolder" />
          </a>
          </div>

          <div>
         <h2> My Challenge 3 project, Created by Dev-Emmy</h2>
         </div>
         </div>
         </div>
       
    </Fragment>
  );
}

export default Pictures;

