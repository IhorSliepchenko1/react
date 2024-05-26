import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../page/Login";
import Main from "../page/Main/Main";

const privateRoutes = [
  { path: "/", element: <Main /> },
  { path: "/call", element: <h2>Hello H2</h2> },
  { path: "*", element: <Navigate to="/" /> },
];

const PrivateComponent = () => {
  return (
    <Routes>
      {privateRoutes.map((item, index) => (
        <Route key={index} path={item.path} element={item.element} />
      ))}
    </Routes>
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
