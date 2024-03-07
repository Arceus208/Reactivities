import React, {
  SyntheticEvent,
  useState,
} from "react";

import { Activity } from "../../../app/models/activity";
import {
  Button,
  Item,
  Label,
  Segment,
} from "semantic-ui-react";

interface ActivityListProps {
  activities: Activity[];
  selectActivity: (id: string) => void;
  deleteActivity: (id: string) => void;
  submitting: boolean;
}

const ActivityList = ({
  activities,
  selectActivity,
  deleteActivity,
  submitting,
}: ActivityListProps) => {
  const [target, setTarget] = useState("");

  const handleActivityDelete = (
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setTarget(e.currentTarget.name);
    deleteActivity(id);
  };

  return (
    <Segment>
      <Item.Group divided>
        {activities.map((activity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">
                {activity.title}
              </Item.Header>
              <Item.Meta>
                {activity.date}
              </Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city},{" "}
                  {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => {
                    selectActivity(activity.id);
                  }}
                  floated="right"
                  content="View"
                  color="blue"
                ></Button>
                <Button
                  onClick={(e) => {
                    handleActivityDelete(
                      e,
                      activity.id
                    );
                  }}
                  floated="right"
                  content="Delete"
                  color="red"
                  name={activity.id}
                  loading={
                    submitting &&
                    target === activity.id
                  }
                ></Button>
                <Label
                  basic
                  content={activity.category}
                ></Label>
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default ActivityList;