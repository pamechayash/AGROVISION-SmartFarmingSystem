import { useState } from "react";
import axios from "axios"
import "../SignupScreen/Signup.css"
import data3 from "../../animationJSON/bulb.json"
import Lottie from 'react-lottie'
import { Navigate, useNavigate } from "react-router-dom";
export default function SignUp(){
  const defaultOptions1={
    loop:true,
    autoplay:true,
    animationData:data3,
    
    rendererSettings:{
        preserveAspectRatio: "xMidYMid slice",
    },
  }
  const [data,setData]=useState({
    name:"",
    area:"",
    email:"",
    password:"",

});
let headerss= {
    'Access-Control-Allow-Origin': 'http://localhost:3000'
  
  };
 const  navigate=useNavigate();
function handleChange(e){

        e.preventDefault()
    
            const { name, value } = e.target;
            setData(prevState => ({
                ...prevState,
                [name]: value
            }));
        };
        async function handleClick(e){
     
        e.preventDefault();
        await axios.post("http://127.0.0.1:9000/auth/userSignup",{name:data.name,area:data.area,email:data.email,password:data.password,
    Headers:headerss
    }).then((res)=>{
      if(res.data.status=="enter"){
        window.localStorage.setItem("islogin",true);
        window.localStorage.setItem("name",data.name);
          navigate("/landing")
      }
      else
      {
          alert(`${res.data.status} \n you may entering a password or email which already used or \n FOLLOW:\n 1. Name length should be of minimum 3 charactors \n 2. Area length should be of minimum 2 charactors \n 3. all fields are required`)
      }
    }
      )}

    return <div className="back">

    <div className="maincont1">
      
          <div className="form">
          <p id="headin1">SignUp</p>
    <input type="text" className="textField" name="name" placeholder="&#10162;  Enter Name" value={data.name} onChange={handleChange}/>
    <input type="text" className="textField" name="area" placeholder="&#10162;  Enter City/village" value={data.area} onChange={handleChange}/>
    <input type="email" className="textField" name = "email" placeholder="&#10162;  Enter Email" value={data.email} onChange={handleChange}/>
    <input type="password" preventDefault="false" className="textField" name="password" placeholder="&#10162;  Enter Password" value={data.password}  onChange={handleChange}/>
    <button className="btn1" onClick={handleClick}>SignUp</button>
    </div>
    <div className="imgdiv2" >
    
    <Lottie 
      options={defaultOptions1}
   
      style={{transform:"scale(0.6)",
  margin:"0px 0px",
  padding:"0px 0px",
position:"sticky",
top:"2px",
left:"1px"
  }}
      height={500}
     width={300} /> 
     
     <strong className="cnt3">| Please SignUp With Us |<br/></strong>




   
   
  
    </div>
    </div>
    </div>
}