import { Link } from "react-router-dom";
import {
  Button,
  Icon,
  Item,
  Segment,
} from "semantic-ui-react";

import { Activity } from "../../../app/models/activity";

interface ActivityListItemProps {
  activity: Activity;
}

const ActivityListItem = ({
  activity,
}: ActivityListItemProps) => {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image
              size="tiny"
              circular
              src="/assets/user.png"
            ></Item.Image>
            <Item.Content>
              <Item.Header
                as={Link}
                to={`/activities/${activity.id}`}
              >
                {activity.title}
              </Item.Header>
              <Item.Description>
                Hosted by Manh
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock"></Icon>
          {activity.date}

          <Icon name="marker"></Icon>
          {activity.venue}
        </span>
      </Segment>
      <Segment secondary>
        Attendees go here
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
