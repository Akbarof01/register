import { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

function useAuthentication() {
  const [user, setUser] = useState(localStorage.getItem("user"));

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(localStorage.getItem("user"));
    }
  }, []);

  return user;
}

function ProtectedRoute({ children }) {
  const user = useAuthentication();

  if (!user) {
    return <Navigate to="/register" />;
  }

  return children;
}

function App() {
  return (
    <div className="bg-[#fff] p-10 h-[100vh] text-white">
      <Routes>
        <Route index path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        >
          <Route index path="/home" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
