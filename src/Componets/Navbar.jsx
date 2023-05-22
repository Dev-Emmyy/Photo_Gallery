import lightlogo from "../logo/light_logo.png";
import darklogo from "../logo/dark_logo.png"
import React ,{Fragment, useState} from "react";
import {Route,Routes,NavLink} from "react-router-dom";
import {BsCloudSun} from "react-icons/bs";
import {BiMoon} from "react-icons/bi";
import {AiOutlineSearch} from "react-icons/ai";
import Pictures from "./Pictures";
import Videos from "./Videos";
import "../Style/Navbar.css";
export const Container = React.createContext();


function Navbar() {
    const [toggle,setToggle] = useState(true);
     const [searchQuery, setSearchQuery] = useState('');


    return(
        <Container.Provider value={{toggle,searchQuery}}>
        <div>
           <nav className={toggle? "secondaryBgColor" : "mainBgColor"}>
            <Fragment>
                <div className="logo">
                <div>
                {
                    toggle? 
                    <img src={darklogo} width={200} height={130}/> : <img src={lightlogo} width={200} height={130}/>
                }
                </div>

                <div className="btn_mode" onClick={() => setToggle(!toggle)}>
                    <h3>{toggle?  "DarkMode" : "LightMode"}</h3>
                    <BsCloudSun fontSize={23} id={toggle? "noDisplay" : "display"}/>
                    <BiMoon fontSize={23} id={toggle? "display" : "noDisplay"}/>

                </div>
            </div>

            <div className="navbar_text">
                <h1>The best free stock photos, royalty free images & videos shared by creators</h1>
                <div className="navbar_input">
                    <input type="text" placeholder="Search for free photos" onChange={ e => setSearchQuery(e.target.value)} value={searchQuery} />
                    <AiOutlineSearch fontSize={23} color="grey" cursor="pointer"/>
                </div>
            </div>

            <div className="navbar_link">
                <div className="link">
                     <NavLink to="/" className={toggle? "secondaryColor" : "mainColor"}>
                       <h3>PICTURES</h3>
                    </NavLink>
            

                    <NavLink to="/Videos" className={toggle? "secondaryColor" : "mainColor"}>
                        <h3>VIDEOS</h3>
                    </NavLink>
                </div>
            </div>


           
            </Fragment>
           </nav>
            <Routes>
                <Route path="" element={<Pictures/>}/>
                <Route path="Videos" element={<Videos/>}/>
            </Routes>
            </div>
            </Container.Provider>
    )
}

export default Navbar;

