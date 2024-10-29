/*шаблон сторінки для корекції  */
import Header from '../../components/Header/Header.jsx'
import SideBar from '../../components/SideBar/SideBar.jsx'
import ScreensPage from '../ScreensPage/ScreensPage'

const HomePage = () => (
	<div className='home-page'>
		<Header />
		<SideBar />
		<ScreensPage />
	</div>
)

export default HomePage
