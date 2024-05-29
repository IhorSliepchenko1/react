import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { useRoutes } from "./router/index";

const App = () => {
  const { valueContext } = useContext(AuthContext);
  const routes = useRoutes(valueContext);

  return <>{routes}</>;
};

export default App;
