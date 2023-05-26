import { useLocation } from "react-router-dom"
import { useState } from "react";
import "../CropRec/CropRec.css"
import Lottie from "react-lottie";
import axios from "axios"
import idea from "../../animationJSON/idea.json"
import think from "../../animationJSON/thinking.json"

export default function Crop(){
  const [crop, setcrop] = useState("")

  const defaultOptions = {

    loop: true,
    autoplay: true, 
    animationData: think,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
}
const defaultOptions1 = {

  loop: true,
  autoplay: true, 
  animationData: idea,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}
    const [formData, setFormData] = useState({
        N: '',
        P: '',
        K: '',
        TEMPERATURE: '',
        HUMIDITY: '',
        PH: '',
        RAINFALL: '',
      });
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
      const handleSubmit = async (event) => {
        event.preventDefault();
        // Send form data to the Flask backend
       await axios.post('http://127.0.0.1:5000/crop', formData)
          .then((response) => {
            // Handle response from the backend
            setcrop(response.data);
          })
          .catch((error) => {
            // Handle error
            console.error(error);
          });
      };

    const location= useLocation();
    const {state}=location;
    console.log(state)
    return <div className="CmainCont">

  <div className="nav">
  <div className="temp"> Temperature: {state.Temp}</div>
  <div className="humid"> humidity:  {state.humidity}</div>
  </div>

<div className="Csubmain">

<div className="color">

{crop?<Lottie options = {defaultOptions1}
              height={400}
           
              width={400}
          />:<Lottie options = {defaultOptions}
              height={400}
           
              width={400}
          />}
          {crop?<div className="cHead">you should grow {crop} in your farm</div>:<div className="cHead">What to Grow</div> }
         
</div>
  
  <div className="cCont">
  <div className="cHead">CROP RECOMMENDATION</div>
  <form className="form5">
 
        <input
        className="in"
          type="number"
          name="N"
          value={formData.N}
          placeholder="Nitrogen in Soil"
          onChange={handleChange}
        />
      
  
     
        <input
         className="in"
          type="number"
          name="P"
          placeholder="phosphorus in Soil"
          value={formData.P}
          onChange={handleChange}
        />
   
      
     
        <input
         className="in"
          type="number"
          name="K"
          placeholder="potassium in Soil"
          value={formData.K}
          onChange={handleChange}
        />
   
      
     
        <input
         className="in"
          type="number"
          name="TEMPERATURE"
          value={formData.TEMPERATURE}
          onChange={handleChange}
          placeholder="temperature"
        />
      
      
     
        
        <input
         className="in"
          type="number"
          name="HUMIDITY"
          placeholder="humidity"
          value={formData.HUMIDITY}
          onChange={handleChange}
        />
    
 
   
        <input
         className="in"
          type="number"
          name="PH"
          placeholder="ph value"
          value={formData.PH}
          onChange={handleChange}
        />
    
      
      
        <input
         className="in"
          type="number"
          name="RAINFALL"
          placeholder="rainfall"
          value={formData.RAINFALL}
          onChange={handleChange}
        />
   
   <div className="button-861"  onClick={handleSubmit}>
 Predict
 </div>

 
  </form>
 
  </div>
  </div>
    </div>
}