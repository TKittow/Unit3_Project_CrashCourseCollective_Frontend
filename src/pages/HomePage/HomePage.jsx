import ProjectGrid from "../../components/ProjectGrid"

export default function HomePage({userData, projects}) {
  return (
    <>
    <div>HomePage</div>
    <div className='cardHolder'>
        <ProjectGrid projects={projects} userData={userData} />
        </div>
    </>
  )
}
