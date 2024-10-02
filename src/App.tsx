import React, { useEffect } from "react";
// import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Search from "./pages/Search/Search.tsx";
import Profile from "./pages/Profile/Profile.tsx";
import SearchResult from "./pages/SearchResult/SearchResult.tsx";
import './UserLogin.css';

const App: React.FC = () => {
  
  const setAxiosHeaders = async ()=>{
    try {
      // const session = await fetchAuthSession();

      // const idToken = session?.tokens?.idToken?.toString() || "";
      // axios.defaults.headers.common['Authorization'] = idToken;
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{

    setAxiosHeaders()

  },[])

  return (
    <Router>
      {/* <div className="user-info">
        <h1 className="user-login">
          {user?.signInDetails?.loginId || 'Guest'}
        </h1>
        <button
          onClick={signOut}
          className="user-sign-out"
        >
          Sign out
        </button>
        </div> */}
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/result" element={<SearchResult />} />
        </Routes>
    </Router>
  );
};

// export default withAuthenticator(App);
export default App;