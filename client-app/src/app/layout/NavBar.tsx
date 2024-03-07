import React from "react";
import {
  Button,
  Container,
  Menu,
} from "semantic-ui-react";

interface NavBarProps {
  openForm: () => void;
}

const NavBar = ({ openForm }: NavBarProps) => {
  return (
    <Menu
      inverted
      fixed="top"
    >
      <Container>
        <Menu.Item header>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activites"></Menu.Item>
        <Menu.Item>
          <Button
            onClick={openForm}
            positive
            content="Create Activity"
          ></Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default NavBar;
