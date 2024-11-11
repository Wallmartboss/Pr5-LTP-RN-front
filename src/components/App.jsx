import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import WelcomePage from '../pages/WelcomePage/WelcomePage';
import AuthPage from '../pages/AuthPage/AuthPage';
import HomePage from '../pages/HomePage/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          // path="/"
          // element={<Navigate to={isLoggedIn ? '/home' : '/welcome'} />}

          path="/"
          element={<Navigate to="/welcome" />}
        />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/auth/:id" element={<AuthPage />} />
        {/* <Route path=":boardId" element={<ScreensPage />} /> */}
        <Route path="/home/*" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
