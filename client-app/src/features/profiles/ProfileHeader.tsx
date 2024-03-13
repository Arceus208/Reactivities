import {
  Divider,
  Grid,
  Header,
  Item,
  Segment,
  Statistic,
} from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import { observer } from "mobx-react-lite";
import FollowButton from "./FollowButton";

interface ProfileHeaderProps {
  profile: Profile;
}

const ProfileHeader = ({
  profile,
}: ProfileHeaderProps) => {
  return (
    <Segment>
      <Grid>
        <Grid.Column width={12}>
          <Item.Group>
            <Item>
              <Item.Image
                avatar
                size="small"
                src={
                  profile.image ||
                  "/assets/user.png"
                }
              ></Item.Image>
              <Item.Content verticalAlign="middle">
                <Header
                  as="h1"
                  content={profile.displayName}
                ></Header>
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width={4}>
          <Statistic.Group widths={2}>
            <Statistic
              label="Followers"
              value={profile.followersCount}
            ></Statistic>
            <Statistic
              label="Following"
              value={profile.followingCount}
            ></Statistic>
          </Statistic.Group>
          <Divider></Divider>
          <FollowButton
            profile={profile}
          ></FollowButton>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default observer(ProfileHeader);
