import ProjectGrid from "../../components/ProjectGrid"

export default function HomePage({userData, projects}) {
  return (
    <>
    <div>HomePage</div>
    <p>{userData.login}{userData.html_url}</p>
    <div className='cardHolder'>
        <ProjectGrid projects={projects} userData={userData} />
        </div>
    </>
  )
}
