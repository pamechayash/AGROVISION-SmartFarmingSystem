import React from "react"
import "./mainScreen.css"
import grass1 from "../../assets/grass1.png"
import { useEffect,useState } from "react";
import{ useNavigate }from "react-router-dom"
import tractor from "../../animationJSON/tractorMoving.json"
import Lottie from 'react-lottie';


const MainScreen=()=>{

const [rotateYamt , setRotation]=useState(0);
useEffect(() => {
document.addEventListener("scroll",()=>{
   setRotation(window.pageYOffset);

  
})


}, [])





 const defaultOptions = {

        loop: true,
        autoplay: true, 
        animationData: tractor,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    }
  
    const [isHovered, setisHovered] = useState(false)
const[motion, setmotion] = useState(0);
const navigate=useNavigate();
function navateToLogin(){
navigate("/login");
}
function navateToSignup(){
  navigate("/signup")
}


return <div className="loginMainContainer" >

  
{/* <div className="innerdiv">
   <Lottie options = {defaultOptions}
              height={150}
          
              width={300}
          />
    </div> */}
    <div className="innerdiv">
   <Lottie options = {defaultOptions}
              height={150}
           
              width={300}
          />
    </div>
<div className="mainCont">



<div className="mainCont1" onMouseOver={()=>{
  setisHovered(true);
}} 
onMouseOut={()=>{
  setisHovered(false);
}}  
>

<div className="content">
 
<h6 className="heading"> AGROVISION</h6> 
   <h6 className="subhead">Cultivating Ideas for Growth</h6>
<div className="btns">
    <div className="signup" onClick={navateToSignup}>
  SignUp
    </div>
    <div className="login" onClick={navateToLogin}>
        LogIn
        </div>
    </div>
 
</div>



</div>

</div>

















    <hr style={{width:"100vw",  borderTop: "10px dotted black" }}/>

    <div className="grass">

    {/* <img src={grass1} /> */}
    </div>






</div>


}
export default MainScreen;
