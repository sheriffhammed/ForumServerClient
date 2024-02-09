import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '../src/app/store'
import App from './App';
// import { BrowserRouter as Router , Route, Routes } from 'react-router-dom';
// import Login from './features/login/components/Login';
// import HomePage from './features/components/HomePage';
// import SignUpForm from './features/users/components/SignUpForm';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <Provider store={store}>
      <App />
    {/* <Router>
      <Routes>
        
        <Route index element={<App />} />
        <Route path="login" element={<Login />} />
        <Route path="homepage" element={<HomePage />} />
        <Route path="signup" element={<SignUpForm />} />
      </Routes>
    </Router> */}
    </Provider>
  </React.StrictMode>
  
);

