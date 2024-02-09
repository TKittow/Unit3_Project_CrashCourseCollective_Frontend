
import { useState, useEffect } from "react"
import './AboutPage.css'

export default function About() {

  const [creatorsInfo, setCreatorsInfo] = useState([])

  const creators = [
    { 
      username: 'JoelleLi',
      userAvatar: 'https://avatars.githubusercontent.com/u/149613614?v=4'
    },  
    {
      username: 'TKittow',
      userAvatar: 'https://avatars.githubusercontent.com/u/120041115?v=4'
    },
    { 
      username: 'CameronOrr',
      userAvatar: 'https://avatars.githubusercontent.com/u/148687429?v=4'
    } 
  ];

  useEffect(() => {
    setCreatorsInfo(creators)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
    <h2>About</h2>
    <div id='aboutWrapper'>
      <div id='aboutCreatorsAvatars'>            
      {creatorsInfo.map((creator, index) => (
            <img id='creatorsAvatars' key={index} src={creator.userAvatar} alt={creator.username} />
          ))}
      </div>
      <div id='aboutText'>
      In just one week, Joelle Li-Cho, Toby Kittow, and Cameron Orr
      joined forces to craft an innovative solution for showcasing
      their professional portfolios. <br/> 
      <br/>Fueled by their passion for
      creativity and collaboration, the trio embarked on a journey to
      design a seamless platform that not only highlighted their
      individual projects but also provided a dynamic space for
      networking and exploration. Through their combined expertise
      in design, development, and user experience, they brought to
      life a comprehensive platform where they and their peers
      could effortlessly display their latest works. From sleek
      interface designs to robust backend functionalities, their
      project not only served as a testament to their skills but
      also as a catalyst for fostering connections within their cohort and
      beyond. <br/>
      <br/>Together, they transformed their vision into a reality,
      demonstrating the power of teamwork and innovation in the
      span of just one exhilarating week.
      </div>
    </div>
    </>
  )
}
