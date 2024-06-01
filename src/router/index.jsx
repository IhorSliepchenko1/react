import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../page/Login/Login";
import Main from "../page/Main/Main";
import NavBar from "../components/NavBar/NavBar";
import UserPosts from "../page/UserPosts/UserPosts";

const privateRoutes = [
  { path: "/", element: <Main /> },
  { path: "/user", element: <UserPosts /> },
  { path: "*", element: <Navigate to="/" /> },
];

const PrivateComponent = () => {
  return (
    <div>
      <NavBar />

      <Routes>
        {privateRoutes.map((item, index) => (
          <Route key={index} path={item.path} element={item.element} />
        ))}
      </Routes>
    </div>
  );
};

const publicRoutes = [
  { path: "/login", element: <Login /> },
  { path: "*", element: <Navigate to="/login" /> },
];

const PublicComponent = () => {
  return (
    <Routes>
      {publicRoutes.map((item, index) => (
        <Route key={index} path={item.path} element={item.element} />
      ))}
    </Routes>
  );
};

export const useRoutes = (isLogin) => {
  return isLogin ? <PrivateComponent /> : <PublicComponent />;
};
