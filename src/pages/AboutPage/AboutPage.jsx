export default function About({userData}) {
  return (
    <>
    <div id='aboutWrapper'>
    <div>About</div>
    <p>{userData.login}{userData.html_url}</p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      In sit amet erat pharetra, tincidunt dolor quis, sodales est.
      Vivamus eu ipsum pulvinar risus vestibulum rhoncus.
      Phasellus a risus dictum, dapibus diam accumsan, porttitor elit.
      In hendrerit tortor sed tortor rutrum consequat.
      Vivamus viverra justo sit amet dolor euismod semper.
    </div>
    </>
  )
}
