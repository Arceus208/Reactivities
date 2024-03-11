import {
  Button,
  Divider,
  Grid,
  Header,
  Item,
  Reveal,
  Segment,
  Statistic,
} from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import { observer } from "mobx-react-lite";

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
              value="5"
            ></Statistic>
            <Statistic
              label="Following"
              value="42"
            ></Statistic>
          </Statistic.Group>
          <Divider></Divider>
          <Reveal animated="move">
            <Reveal.Content
              visible
              style={{ width: "100%" }}
            >
              <Button
                fluid
                color="teal"
                content="Following"
              ></Button>
            </Reveal.Content>
            <Reveal.Content
              hidden
              style={{ width: "100%" }}
            >
              <Button
                fluid
                basic
                // eslint-disable-next-line no-constant-condition
                color={true ? "red" : "green"}
                content={
                  // eslint-disable-next-line no-constant-condition
                  true ? "Unfollow" : "Follow"
                }
              ></Button>
            </Reveal.Content>
          </Reveal>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default observer(ProfileHeader);
