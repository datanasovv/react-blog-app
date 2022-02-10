import { useContext } from "react";
import { Route, useNavigate } from "react-router-dom";
import { ThemeContext } from "../ThemeContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(ThemeContext);
  const navigate = useNavigate();
  return (
    <Route
      render={(props) => (user ? <Component {...props} /> : navigate("/login"))}
    />
  );
};
export default PrivateRoute;
