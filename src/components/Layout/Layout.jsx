import Sidebar from '../SideBar/Sidebar.jsx';
import Header from '../Header/Header.jsx';
import ScreensPage from '../ScreensPage/ScreensPage.jsx';
import s from './Layout.module.css';

const Layout = () => {
  return (
    <div className={s.layout}>
      <Sidebar className={s.sidebar} />
      <div className={s.mainContent}>
        <Header className={s.header} />
        <ScreensPage className={s.screensPage} />
      </div>
    </div>
  );
};

export default Layout;
