import React from "react"
import './index.css';





export default function Splash(){
    return(
        <div className="parent">
            <div className="SplashBox1">
                <h3 className="welcome">Welcome to TidyNote</h3>
                <h4 className="quote">"Tame your Work, Organise your Life"</h4>
                <h4 className="quote2">Remember everything and tackle any project with your notes, tasks, and schedule all in one place.</h4>
            </div>
            <div className="SplashBox2">
                <img src='https://cdn.discordapp.com/attachments/536996013911572484/930289688286220288/favcon.png' alt='green' className="image"></img>
            </div>
        </div>
    )
}
