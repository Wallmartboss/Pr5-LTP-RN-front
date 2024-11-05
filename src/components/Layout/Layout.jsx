import Sidebar from '../SideBar/SideBar.jsx';
import Header from '../Header/Header.jsx';
import ScreensPage from '../ScreensPage/ScreensPage.jsx';
import s from './Layout.module.css';
import { Toaster } from 'react-hot-toast';

const Layout = () => {
  return (
    <div className={s.layout}>
      <Toaster />
      <Sidebar className={s.sidebar} />
      <div className={s.mainContent}>
        <Header className={s.header} />
        <ScreensPage className={s.screensPage} />
      </div>
    </div>
  );
};

export default Layout;
