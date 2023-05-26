import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import { useEffect } from "react";
import bird from "../../assets/bird1.png"
import "./landing.css"


import MainSection from "./mainSection/mainSection";
import Section1 from "./Section1/Section1";
export default function Landing(){
const navigate=useNavigate()
const [latitude, setLatitude] = useState(null);
const [longitude, setLongitude] = useState(null);
const [weatherData, setWeatherData] = useState(null);
const [error, setError] = useState(null);

const handleLocationClick =  () => {
    if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          
    
        },
        (error) => {
          setError('Error retrieving location.');
          console.log(error);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };
  useEffect(() => {
    const fetchWeatherData = async (lat, lon) => {
      try {
        const apiKey = '794d60906fd233f40c6fd336bfb62a2c';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
        setWeatherData(data);
      } catch (error) {
        setError('Error fetching weather data.');
        console.log(error);
      }
    };
  
    handleLocationClick();
    if (latitude !== null && longitude !== null) {
      fetchWeatherData(latitude, longitude);
     
    }
   
  }, [latitude,longitude]);


  

//   return () => {
//     second
//   }



  
return <div>

 <MainSection today={weatherData}/>


<Section1 today={weatherData}/>



</div>
}





