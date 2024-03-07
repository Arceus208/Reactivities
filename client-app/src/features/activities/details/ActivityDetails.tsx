import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardMeta,
  CardDescription,
  Image,
  Button,
} from "semantic-ui-react";
import { useStore } from "../../../app/store/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";

const ActivityDetails = () => {
  const { activityStore } = useStore();
  const {
    selectedActivity: activity,
    openForm,
    cancelSelectedActivity,
  } = activityStore;

  if (!activity)
    return <LoadingComponent></LoadingComponent>;

  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${activity.category}.jpg`}
        wrapped
        ui={false}
      />
      <CardContent>
        <CardHeader>{activity.title}</CardHeader>
        <CardMeta>
          <span>{activity.date}</span>
        </CardMeta>
        <CardDescription>
          {activity.description}
        </CardDescription>
      </CardContent>
      <CardContent extra>
        <Button.Group widths="2">
          <Button
            basic
            color="blue"
            content="Edit"
            onClick={() => {
              openForm(activity.id);
            }}
          ></Button>
          <Button
            onClick={cancelSelectedActivity}
            basic
            color="grey"
            content="Cancel"
          ></Button>
        </Button.Group>
      </CardContent>
    </Card>
  );
};

export default ActivityDetails;
