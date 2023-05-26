import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import tree from "../../../assets/tree.json"
import bird from "../../../assets/bird1.png"
import Lottie from "react-lottie";
import "./mainSection.css"

export default function MainSection(props){
const nm= window.localStorage.getItem("name");
   const defaultOptions = {

      loop: true,
      autoplay: true, 
      animationData: tree,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
  }



  console.log(nm);
return <div className="MainContainer">
   
   <div className="button-86">
   Weather
 </div>
  {props.today?<div className="weatherDis">
     <div className="weatherHead">PLACE: {props.today.name}</div>
     <div className="weatherSub">TODAY</div>
     <div className="weathermini">TEMPERATURE:  {Math.round((props.today.main.temp-273.15)*100)/100}</div> 
 
     <div className="weathermini">PRESSURE:  {props.today.main.pressure}</div> 
     <div className="weathermini">DESCRIPTION:  {props.today.weather[0].description}</div>
     <div className="weathermini">VISIBILITY:  {props.today.visibility}</div> 
     <div className="weathermini">WIND: {props.today.wind.speed}</div> 
     <div className="weathermini">HUMIDITY:  {props.today.main.humidity}</div> 
  </div>:"LOADING...Weather Data"} 
   <div className="mnhead">Welcome To Agrovision <span className="name">{nm.toUpperCase()}</span></div>
   <div className="subcont">

   <div className="contentBox1">We believe that by harnessing the <span className="high">power of technology</span>, we can unlock limitless potential in farming and cultivate a brighter future for food production.</div>
<div className="birddiv">

<div className="birdimg">
<Lottie options = {defaultOptions}
              height={300}
           
              width={300}
          />
</div>

</div>
<div className="contentBox">With the <span className="high">precision and predictive capabilities of machine learning</span>, I have unwavering confidence in our ability to enhance farming methods, making them more efficient, sustainable, and productive than ever before</div>
</div>

{/* <div onClick={handleClick}>Logout</div> */}

<div className="colordiv">

</div>

</div>
}





