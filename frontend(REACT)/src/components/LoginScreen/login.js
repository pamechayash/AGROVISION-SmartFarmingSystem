import { useState } from "react";
import axios from "axios"
import "../LoginScreen/login.css"
import Landing from "../landingScreen/landing";
import { useNavigate } from "react-router-dom";
export default function Login(){

const [data,setData]=useState({
    name:"",
    area:"",
    email:"",
    password:"",
});
function handleClick1(){
    navigate("/signup")
}
const [login, setlogin] = useState(false);
     const navigate=useNavigate();
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
        await axios.post("http://127.0.0.1:9000/auth/userLogin",data).then((res)=>{
            console.log(res.data);
            if(res.data.status==true){
                window.localStorage.setItem("islogin",true);
                window.localStorage.setItem("name",data.name);
                navigate("/landing")
          
            }
            else{
                alert("please enter correct credentials")
            }
            
        })
      
       
       
     
        }
     
   
    return <div className="back">

  <div className="maincont">
    
        <div className="form1">
            <h2 className="headin">LogIn</h2>
    <input className="textField" type="text" name = "name" placeholder="&#10162;  Enter Name" value={data.name} onChange={handleChange}/>
    <input className="textField" type="text" name = "area" placeholder="&#10162;  Enter City/village" value={data.area} onChange={handleChange}/>
    <input className="textField" type="email" name = "email" placeholder="&#10162;  Enter Email" value={data.email} onChange={handleChange}/>
    <input className="textField" type="password" name = "password" placeholder="&#10162;  Enter Password" value={data.password}  onChange={handleChange}/>
    <button  className="btn1" onClick={handleClick}>Login</button>
    <button className="btn1" onClick={handleClick1}>SignUp</button>
    </div>
    <div className="imgdiv" >
    <strong className="cnt">AgroVision <br/>| Eating is an agricultural act |<br/></strong>
    <strong className="cnt1">  Please Login To Enter </strong>



   
   
    </div>
    </div>
  
    </div>
}