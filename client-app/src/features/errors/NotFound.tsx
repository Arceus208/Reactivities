import React from "react";
import { Link } from "react-router-dom";
import {
  Header,
  Segment,
  Icon,
  Button,
} from "semantic-ui-react";

const NotFound = () => {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name="search">
          Oops - we could not find what you are
          looking for!
        </Icon>
      </Header>
      <Segment.Inline>
        <Button
          as={Link}
          to="/activities"
        >
          Return to activites page
        </Button>
      </Segment.Inline>
    </Segment>
  );
};

export default NotFound;
