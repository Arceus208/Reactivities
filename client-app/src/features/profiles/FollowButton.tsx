import {
  Button,
  Reveal,
} from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import { useStore } from "../../app/store/store";
import { SyntheticEvent } from "react";

interface FollowButtonProps {
  profile: Profile;
}

const FollowButton = ({
  profile,
}: FollowButtonProps) => {
  const { profileStore, userStore } = useStore();
  const { updateFollowing, loading } =
    profileStore;

  if (
    userStore.user?.username === profile.username
  )
    return null;

  const handleFollow = (
    e: SyntheticEvent,
    username: string
  ) => {
    e.preventDefault();
    profile.following
      ? updateFollowing(username, false)
      : updateFollowing(username, true);
  };

  return (
    <Reveal animated="move">
      <Reveal.Content
        visible
        style={{ width: "100%" }}
      >
        <Button
          fluid
          color="teal"
          content={
            profile.following
              ? "Following"
              : "Not following"
          }
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
          color={
            profile.following ? "red" : "green"
          }
          content={
            // eslint-disable-next-line no-constant-condition
            profile.following
              ? "Unfollow"
              : "Follow"
          }
          loading={loading}
          onClick={(e) =>
            handleFollow(e, profile.username)
          }
        ></Button>
      </Reveal.Content>
    </Reveal>
  );
};

export default FollowButton;
