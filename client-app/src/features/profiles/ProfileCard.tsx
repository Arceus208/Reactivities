import React from "react";
import { Profile } from "../../app/models/profile";
import { observer } from "mobx-react-lite";
import {
  Card,
  Icon,
  Image,
} from "semantic-ui-react";
import { Link } from "react-router-dom";

interface ProfileCardProps {
  profile: Profile;
}

const ProfileCard = ({
  profile,
}: ProfileCardProps) => {
  return (
    <Card
      as={Link}
      to={`/profiles/${profile.username}`}
    >
      <Image
        src={profile.image || "/assets/user.png"}
      ></Image>
      <Card.Content>
        <Card.Header>
          {profile.displayName}
        </Card.Header>
        <Card.Description>
          Bio goes here
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name="user"></Icon>20 followers
      </Card.Content>
    </Card>
  );
};

export default observer(ProfileCard);
