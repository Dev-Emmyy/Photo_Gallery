import { Fragment, useContext, useEffect,useRef,useState } from "react";
import { createClient } from 'pexels';
import "../Style/Videos.css";
import { Container } from "./Navbar";
import BottomBg from "./bottom img.jpg";
import {AiFillLinkedin,AiOutlineTwitter,AiFillGithub} from "react-icons/ai"

const client = createClient('Bptfdr3SWwifXyj51dHU4fKFMgp1Q6cP0Z1U0lNHRmb8ihMx673SLtP8');

function Videos() {
  const [videos,setVideos] = useState([]);
  const [searchVidoes, setSearchVidoes] = useState([]);
  const {toggle,searchQuery} = useContext(Container);
  const [loading, setLoading] = useState(true);


useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  useEffect(() => {
    client.videos.popular({ per_page: 63 })
    .then(response => {
      const hdVideos = response.videos.filter(video => {
          const hdFile = video.video_files.find(file => file.height >= 720);
          return hdFile !== undefined;
        });
        setVideos(hdVideos);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    client.videos.search({query: searchQuery, per_page: 63 })
    .then(response => {
      const hdVideos = response.videos.filter(video => {
          const hdFile = video.video_files.find(file => file.height >= 720);
          return hdFile !== undefined;
        });
        setSearchVidoes(hdVideos);
      })
      .catch(error => {
        console.error(error);
      });
  }, [searchQuery]);

  const videoRefs = useRef([]);

  function handleVideoToggle(index) {
    const video = videoRefs.current[index];

    if (video.paused) {
      video.play();
    } else {
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <Fragment>
      <div id={toggle? "secondaryBgColor" : "mainBgColor"}>
       <h1>Popular Free Stock Videos</h1>

      <div>
        {loading ? ( // Render loading spinner if loading is true
       <div className="loading-spinner"></div>
       ) : (
      <div className="videos-container">
        {searchVidoes.map( (video , index) => (
          <div key={video.id} className="video-item">
            <div className="video-wrapper">
              <video 
              ref={ref => (videoRefs.current[index] = ref)}
              onMouseEnter={() => handleVideoToggle(index)}
              onMouseLeave={() => handleVideoToggle(index)}
              >
                {video.video_files.map(file => (
                  file.height >= 720 && (
                    <source
                      key={file.id}
                      src={file.link}
                      type={file.file_type}
                    />
                  )
                ))}
              </video>
               <div
                className="video-overlay"
                onClick={() => handleVideoToggle(index)}
              >
              </div>
            </div>
            <div className="video-info">
              <p className="video-title">{video.user.name}</p>
              <p className="video-views">{video.view_count} views</p>
            </div>
          </div>
        ))}
      </div>
       )}
      </div>


      <div>
        {loading ? ( // Render loading spinner if loading is true
       <div className="loading-spinner"></div>
       ) : (
      <div className="videos-container">
        {videos.map( (video , index) => (
          <div key={video.id} className="video-item">
            <div className="video-wrapper">
              <video 
              ref={ref => (videoRefs.current[index] = ref)}
              onMouseEnter={() => handleVideoToggle(index)}
              onMouseLeave={() => handleVideoToggle(index)}
              >
                {video.video_files.map(file => (
                  file.height >= 720 && (
                    <source
                      key={file.id}
                      src={file.link}
                      type={file.file_type}
                    />
                  )
                ))}
              </video>
               <div
                className="video-overlay"
                onClick={() => handleVideoToggle(index)}
              >
              </div>
            </div>
            <div className="video-info">
              <p className="video-title">{video.user.name}</p>
              <p className="video-views">{video.view_count} views</p>
            </div>
          </div>
        ))}
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
         <h2> My Challenge 2 project, Created by Dev-Emmy</h2>
         </div>
         </div>
         </div>
    </Fragment>
  );
}

export default Videos;
