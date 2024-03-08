import { Container } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import {
  Outlet,
  useLocation,
} from "react-router-dom";

import "./styles.css";
import NavBar from "./NavBar";
import HomePage from "../../features/home/HomePage";
import { ToastContainer } from "react-toastify";

function App() {
  const location = useLocation();

  return (
    <>
      <ToastContainer
        position="bottom-right"
        hideProgressBar
        theme="colored"
      ></ToastContainer>
      {location.pathname === "/" ? (
        <HomePage></HomePage>
      ) : (
        <>
          <NavBar></NavBar>
          <Container style={{ marginTop: "7em" }}>
            <Outlet></Outlet>
          </Container>
        </>
      )}
    </>
  );
}

export default observer(App);
