// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AdminPage from "./pages/AdminPage";
// import LoginPage from "./pages/LoginPage";
// import SignupPage from "./pages/SignupPage";
// import HomePage from "./pages/HomePage";
// import ProtectedRoute from "./components/admin/ProtectedRoute";


// function App() {
//   return (
   
//     <Router>
//       <Routes>
//       <Route path="/" element={<HomePage />} />
//        // <Route path="/portfolio/:username" element={<HomePage />} />
//         {/* <Route
//           path="/admin/*"
//           element={
//             <ProtectedRoute>
//               <AdminPage />
//             </ProtectedRoute>
//           }
//         /> */}
//         {/* <Route path="/login" element={<LoginPage />} />
//         <Route path="/signup" element={<SignupPage />} /> */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";

import ProtectedRoute from "./components/admin/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route path="/portfolio/:username" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

 export default App;
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import HomePage from "./pages/HomePage";
// import LoginPage from "./pages/LoginPage";
// import SignupPage from "./pages/SignupPage";
// import AdminPage from "./pages/AdminPage";
// import ProtectedRoute from "./components/admin/ProtectedRoute";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/signup" element={<SignupPage />} />
//         <Route
//           path="/admin/*"
//           element={
//             <ProtectedRoute>
//               <AdminPage />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
