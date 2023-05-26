
import React, { useState } from 'react';
import axios from 'axios';
import "./Disease.css"
import {disData} from '../../utils/diseaseData';
function Disease() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [disease, setdisease] = useState("none")
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();

    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile);

      // Send the formData to the Flask API using fetch or Axios
      await axios.post('http://127.0.0.1:5000/predict', formData)
          .then((response) => {
            // Handle response from the backend
            setdisease(response.data);
          })
          .catch((error) => {
            // Handle error
            console.error(error);
          });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />

      <button type="submit">Upload</button>
      <div className='output'>
      {disease.dis}
     {disData[disease.dis] && "CROP:"+disData[disease.dis]["Crop"]}<br/>
      {disData[disease.dis] && "Disease:"+disData[disease.dis]["Disease"]}<br/>
      <div className='causes'>
      CAUSES: 
      {disData[disease.dis] && (disData[disease.dis]["Cause of disease"] ? disData[disease.dis]["Cause of disease"].map((ele)=>{return <div className='elements'>{ele}</div>}):"ALL GOOD") }
      </div>
      <div className='cures'>
      CURES AND PREVENTIONS: 
      {disData[disease.dis]  && disData[disease.dis]["How to prevent/cure the disease"].map((ele)=>{return <div className='elements'>{ele}</div>})}
      </div>
      </div>
    </form>
  );
}

export default Disease;
