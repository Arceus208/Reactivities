import {
  Button,
  Container,
  Menu,
} from "semantic-ui-react";

import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Menu
      inverted
      fixed="top"
    >
      <Container>
        <Menu.Item
          as={NavLink}
          to="/"
          header
        >
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          Reactivities
        </Menu.Item>
        <Menu.Item
          name="Activites"
          as={NavLink}
          to="/activities"
        ></Menu.Item>
        <Menu.Item>
          <Button
            as={NavLink}
            to="/createActivity"
            positive
            content="Create Activity"
          ></Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default NavBar;
