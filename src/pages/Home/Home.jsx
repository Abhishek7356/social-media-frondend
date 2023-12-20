import './Home.css'
import LeftBar from '../../components/LeftBar/LeftBar'
import Feed from '../../components/Feed/Feed'
import RightBar from '../../components/RightBar/RightBar'

function Home() {

  return (
    <div className='homeConatiner'>
      <LeftBar />
      <Feed />
      <RightBar />
    </div>
  )
}

export default Home