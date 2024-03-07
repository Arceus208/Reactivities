import { Grid } from "semantic-ui-react";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";

import ActivityList from "./ActivityList";

import { useStore } from "../../../app/store/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ActivityFilters from "./ActivityFilters";

const ActivityDashBoard = () => {
  const { activityStore } = useStore();
  const { loadActivities, activityRegistry } =
    activityStore;

  useEffect(() => {
    if (activityRegistry.size <= 1)
      loadActivities();
  }, [loadActivities, activityRegistry.size]);

  if (activityStore.loadingInitial)
    return (
      <LoadingComponent content="Loading App"></LoadingComponent>
    );

  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList></ActivityList>
      </Grid.Column>
      <Grid.Column width="6">
        <ActivityFilters></ActivityFilters>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashBoard);
