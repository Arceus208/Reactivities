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

import { Activity } from "../../../app/models/activity";

interface ActivityDetailsProps {
  activity: Activity;
  cancelSelectActivity: () => void;
  openForm: (id: string) => void;
}

const ActivityDetails = ({
  activity,
  cancelSelectActivity,
  openForm,
}: ActivityDetailsProps) => {
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
            onClick={cancelSelectActivity}
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
