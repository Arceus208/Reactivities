import { Grid, Loader } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import ActivityList from "./ActivityList";

import { useStore } from "../../../app/store/store";

import ActivityFilters from "./ActivityFilters";
import { PagingParams } from "../../../app/models/pagination";
import InfiniteScroll from "react-infinite-scroller";
import ActivityListItemPlaceholder from "./ActivityListItemPlaceholder";

const ActivityDashBoard = () => {
  const { activityStore } = useStore();
  const {
    loadActivities,
    activityRegistry,
    setPagingParams,
    pagination,
  } = activityStore;
  const [loadingNext, setLoadingNext] =
    useState(false);

  const handleGetNext = () => {
    setLoadingNext(true);
    setPagingParams(
      new PagingParams(
        pagination!.currentPage + 1
      )
    );
    loadActivities().then(() =>
      setLoadingNext(false)
    );
  };

  useEffect(() => {
    if (activityRegistry.size <= 1)
      loadActivities();
  }, [loadActivities, activityRegistry.size]);

  return (
    <Grid>
      <Grid.Column width="10">
        {activityStore.loadingInitial &&
        activityRegistry.size === 0 &&
        !loadingNext ? (
          <>
            <ActivityListItemPlaceholder></ActivityListItemPlaceholder>
            <ActivityListItemPlaceholder></ActivityListItemPlaceholder>
          </>
        ) : (
          <InfiniteScroll
            pageStart={0}
            loadMore={handleGetNext}
            hasMore={
              !loadingNext &&
              !!pagination &&
              pagination.currentPage <
                pagination.totalPages
            }
            initialLoad={false}
          >
            <ActivityList></ActivityList>
          </InfiniteScroll>
        )}
      </Grid.Column>
      <Grid.Column width="6">
        <ActivityFilters></ActivityFilters>
      </Grid.Column>
      <Grid.Column width={10}>
        <Loader active={loadingNext}></Loader>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashBoard);
