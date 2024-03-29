import { Link } from "react-router-dom";
import {
  Button,
  Icon,
  Item,
  Label,
  Segment,
} from "semantic-ui-react";
import { format } from "date-fns";

import { Activity } from "../../../app/models/activity";
import ActivityListItemAttendee from "./ActivityListItemAttendee";

interface ActivityListItemProps {
  activity: Activity;
}

const ActivityListItem = ({
  activity,
}: ActivityListItemProps) => {
  return (
    <Segment.Group>
      <Segment>
        {activity.isCancelled && (
          <Label
            attached="top"
            color="red"
            content="Cancelled"
            style={{ textAlign: "center" }}
          ></Label>
        )}
        <Item.Group>
          <Item>
            <Item.Image
              style={{ marginBottom: 5 }}
              size="tiny"
              circular
              src={
                activity.host?.image ||
                "/assets/user.png"
              }
            ></Item.Image>
            <Item.Content>
              <Item.Header
                as={Link}
                to={`/activities/${activity.id}`}
              >
                {activity.title}
              </Item.Header>
              <Item.Description>
                Hosted by{" "}
                <Link
                  to={`/profiles/${activity.hostUsername}`}
                >
                  {activity.host?.displayName}
                </Link>
              </Item.Description>
              {activity.isHost && (
                <Item.Description>
                  <Label
                    basic
                    color="orange"
                  >
                    You are hosting this activity
                  </Label>
                </Item.Description>
              )}
              {activity.isGoing &&
                !activity.isHost && (
                  <Item.Description>
                    <Label
                      basic
                      color="green"
                    >
                      You are going to this
                      activity
                    </Label>
                  </Item.Description>
                )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock"></Icon>
          {format(
            activity.date!,
            "dd MMM yyyy h:mm aa"
          )}
          <Icon name="marker"></Icon>
          {activity.venue}
        </span>
      </Segment>
      <Segment secondary>
        <ActivityListItemAttendee
          attendees={activity.attendees!}
        ></ActivityListItemAttendee>
      </Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button
          as={Link}
          to={`/activities/${activity.id}`}
          color="teal"
          floated="right"
          content="View"
        ></Button>
      </Segment>
    </Segment.Group>
  );
};

export default ActivityListItem;
