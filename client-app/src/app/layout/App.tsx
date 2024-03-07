import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { v4 as uuid } from "uuid";

import { Activity } from "../models/activity";
import "./styles.css";
import NavBar from "./NavBar";
import ActivityDashBoard from "../../features/activities/dashboard/ActivityDashBoard";

function App() {
  const [activities, setActivities] = useState<
    Activity[]
  >([]);
  const [selectedActivity, setSelectedActivity] =
    useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios
      .get<Activity[]>(
        "http://localhost:5000/api/activities"
      )
      .then((response) => {
        setActivities(response.data);
      });
  }, []);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(
      activities.find((x) => x.id === id)
    );
  };

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  };

  const handleFormOpen = (id?: string) => {
    id
      ? handleSelectActivity(id)
      : handleCancelSelectActivity();
    setEditMode(true);
  };

  const handleFormClose = () => {
    setEditMode(false);
  };

  const handleCreateOrEditActivity = (
    activity: Activity
  ) => {
    activity.id
      ? setActivities([
          ...activities.filter(
            (x) => x.id !== activity.id
          ),
          activity,
        ])
      : setActivities([
          ...activities,
          { ...activity, id: uuid() },
        ]);
    setEditMode(false);
    setSelectedActivity(activity);
  };

  const handleDeleteActivity = (id: string) => {
    setActivities([
      ...activities.filter((x) => x.id !== id),
    ]);
  };

  return (
    <>
      <NavBar openForm={handleFormOpen}></NavBar>
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashBoard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={
            handleCancelSelectActivity
          }
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={
            handleCreateOrEditActivity
          }
          deleteActivity={handleDeleteActivity}
        ></ActivityDashBoard>
      </Container>
    </>
  );
}

export default App;
