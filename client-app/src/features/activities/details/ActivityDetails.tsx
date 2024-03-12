import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/store/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
import ActivityDetailsInfo from "./ActivityDetailsInfo";
import ActivityDetailsChat from "./ActivityDetailsChat";
import ActivityDetailsSidebar from "./ActivityDetailsSidebar";

const ActivityDetails = () => {
  const { activityStore } = useStore();
  const {
    selectedActivity: activity,
    loadActivity,
    loadingInitial,
    clearSelectedActivity,
  } = activityStore;

  const { id } = useParams();

  useEffect(() => {
    if (id) loadActivity(id);
    return () => clearSelectedActivity();
  }, [id, loadActivity, clearSelectedActivity]);

  if (loadingInitial || !activity)
    return <LoadingComponent></LoadingComponent>;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailsHeader
          activity={activity}
        ></ActivityDetailsHeader>
        <ActivityDetailsInfo
          activity={activity}
        ></ActivityDetailsInfo>
        <ActivityDetailsChat
          activityId={activity.id}
        ></ActivityDetailsChat>
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailsSidebar
          activity={activity}
        ></ActivityDetailsSidebar>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDetails);
