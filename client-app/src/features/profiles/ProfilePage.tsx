import { Grid } from "semantic-ui-react";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useStore } from "../../app/store/store";
import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";

const ProfilePage = () => {
  const { username } = useParams<{
    username: string;
  }>();
  const { profileStore } = useStore();
  const { loadingProfile, loadProfile, profile } =
    profileStore;

  useEffect(() => {
    if (username) loadProfile(username);
  }, [loadProfile, username]);

  if (loadingProfile)
    return (
      <LoadingComponent content="Loading profile..."></LoadingComponent>
    );

  return (
    <Grid>
      <Grid.Column width={16}>
        #
        {profile && (
          <>
            <ProfileHeader
              profile={profile}
            ></ProfileHeader>
            <ProfileContent
              profile={profile}
            ></ProfileContent>
          </>
        )}
      </Grid.Column>
    </Grid>
  );
};

export default observer(ProfilePage);
