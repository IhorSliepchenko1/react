import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../page/Login/Login";
import Main from "../page/Main/Main";
import Loader from "../components/UI/Loader/Loader";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar/NavBar";

const privateRoutes = [
  { path: "/", element: <Main /> },
  { path: "/converter-files", element: <h2>Comming soon</h2> },
  { path: "*", element: <Navigate to="/" /> },
];

const PrivateComponent = () => {
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoader(true);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  if (!loader) {
    return <Loader />;
  }
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
