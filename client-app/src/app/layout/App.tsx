import { Container } from "semantic-ui-react";
import { useEffect } from "react";

import "./styles.css";
import NavBar from "./NavBar";
import ActivityDashBoard from "../../features/activities/dashboard/ActivityDashBoard";

import LoadingComponent from "./LoadingComponent";
import { useStore } from "../store/store";
import { observer } from "mobx-react-lite";

function App() {
  const { activityStore } = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial)
    return (
      <LoadingComponent content="Loading App"></LoadingComponent>
    );

  return (
    <>
      <NavBar></NavBar>
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashBoard></ActivityDashBoard>
      </Container>
    </>
  );
}

export default observer(App);
