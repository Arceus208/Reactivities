import { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { v4 as uuid } from "uuid";

import { Activity } from "../models/activity";
import "./styles.css";
import NavBar from "./NavBar";
import ActivityDashBoard from "../../features/activities/dashboard/ActivityDashBoard";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

function App() {
  const [activities, setActivities] = useState<
    Activity[]
  >([]);
  const [selectedActivity, setSelectedActivity] =
    useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] =
    useState(false);

  useEffect(() => {
    agent.Activities.list().then((response) => {
      const activites: Activity[] = [];

      response.forEach((activity) => {
        activity.date =
          activity.date.split("T")[0];
        activites.push(activity);
      });

      setActivities(activites);
      setLoading(false);
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
    setSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(
        () => {
          setActivities([
            ...activities.filter(
              (x) => x.id !== activity.id
            ),
            activity,
          ]);
          setSelectedActivity(activity);
          setEditMode(false);
          setSubmitting(false);
        }
      );
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(
        () => {
          setActivities([
            ...activities,
            activity,
          ]);
          setSelectedActivity(activity);
          setEditMode(false);
          setSubmitting(false);
        }
      );
    }
  };

  const handleDeleteActivity = (id: string) => {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([
        ...activities.filter((x) => x.id !== id),
      ]);
      setSubmitting(false);
    });
  };

  if (loading)
    return (
      <LoadingComponent content="Loading App"></LoadingComponent>
    );

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
          submitting={submitting}
        ></ActivityDashBoard>
      </Container>
    </>
  );
}

export default App;
