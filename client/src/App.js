import { BrowserRouter as Router , Route, Routes } from 'react-router-dom';
//import Login from './features/login/components/Login';
import Login from './features/auth/Login';
import HomePage from './features/components/HomePage';
import SignUpForm from './features/users/components/SignUpForm';
import ForgotPassword from './features/users/components/ForgotPassword';
import Header from './features/components/Header';
import MyPosts from './features/posts/components/MyPosts';
import RequireAuth from './features/auth/RequireAuth'
import Layout from './features/components/Layout';
function App() {
  return (
    <Router>
      <Routes>    
        <Route path="/" element={<Layout />}>    
          <Route index element={<Login />} />
          {/* protected routes */}
          <Route element={<RequireAuth />}>
              <Route  path="/" element={<Header />} >
              <Route index element={<HomePage />} />
              <Route path="homepage" element={<HomePage />} />
              {/* <Route path="userslist" element={<UsersList />} /> */}
              <Route path="mypost/:userId" element={<MyPosts />} />
                        
            </Route>
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="forgotpassword" element={<ForgotPassword />} />
          <Route path="signup" element={<SignUpForm />} />
          <Route path="*" element={"Page Not Found"} />
        </Route>
      </Routes>
    </Router> 
  );
}

export default App;
