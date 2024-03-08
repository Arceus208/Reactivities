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
import { useStore } from "../store/store";
import { useEffect } from "react";
import LoadingComponent from "./LoadingComponent";
import ModalContainer from "../common/modals/ModalContainer";

function App() {
  const location = useLocation();
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore
        .getUser()
        .finally(() =>
          commonStore.setAppLoaded()
        );
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  if (!commonStore.appLoaded)
    return (
      <LoadingComponent content="Loading app..."></LoadingComponent>
    );

  return (
    <>
      <ModalContainer></ModalContainer>
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
