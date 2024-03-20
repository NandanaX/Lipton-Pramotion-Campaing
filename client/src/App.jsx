import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import FormComponent from "./pages/Form";
import Login from "./pages/Login";
import RecordsView from "./pages/RecordsView";

const UserRouteGuard = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (user) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FormComponent />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/records-view"
            element={
              <UserRouteGuard>
                <RecordsView />
              </UserRouteGuard>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
