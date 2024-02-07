import ProjectGrid from "../../components/ProjectGrid"

export default function HomePage({userData, projects}) {
  return (
    <>
    <h2>HomePage</h2>
    <p>
      {userData.login} <br /> 
      {userData.html_url}
    </p>
    <div className='cardHolder'>
        <ProjectGrid projects={projects} userData={userData} />
        </div>
    </>
  )
}
