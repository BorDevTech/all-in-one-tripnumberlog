import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import * as pages from "./pages/index";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./assets/Firebase/firebase.config";
import "./App.css";
function App() {
  const [isAuth, setIsAuth] = useState<boolean>(
    Boolean(localStorage.getItem("isAuth"))
  );

  const signoutGoogleUser = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };

  return (
    <>
      <div className="container-fluid">
        <Router>
          <nav className="navbar bg-body-dark">
            <Link to="/">Home</Link>
            {!isAuth ? (
              <Link to="/login">Sign In</Link>
            ) : (
              <>
                <Link to="/createtransaction">Create Transaction</Link>
                <button onClick={signoutGoogleUser}>Sign Out</button>
              </>
            )}
          </nav>
          <Routes>
            <Route path="/" element={<pages.Home isAuth={isAuth} />} />
            <Route
              path="/createtransaction"
              element={<pages.CreateTransaction isAuth={isAuth} />}
            />
            <Route
              path="/login"
              element={<pages.Login setIsAuth={setIsAuth} isAuth={isAuth} />}
            />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
