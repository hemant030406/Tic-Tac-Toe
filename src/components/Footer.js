import React from "react";

function Footer(){
    return(
        <div id="footer">
        <div id="complete">
        <div id="ig">
        <i className="fa-brands fa-instagram fa-2xl" style={{color: '#da1043'}}></i>
        <a href="https://www.instagram.com/hemant030406/" target="blank" style={{textDecoration:"none",color: 'rgb(254 188 205)',marginLeft:'0.7rem'}}>My Instagram</a><br></br>
        <img src="https://cloud.githubusercontent.com/assets/7534680/4515518/6739a508-4bc1-11e4-80bc-670bcc216762.png" style={{borderRadius:'100%/60%',marginTop:'1rem',width:'30px'}}/>
        <a href="mailto:hemant030406@gmail.com" target="blank" style={{textDecoration:"none",color: 'rgb(254 188 205)',marginLeft:'2.95rem',display:'block',marginTop:'-33px'}}>Send email</a>
        </div>
        </div>
        </div>
    )
}

export default Footer
