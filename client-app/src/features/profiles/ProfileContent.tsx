import { Tab } from "semantic-ui-react";

import ProfilePhotos from "./ProfilePhotos";
import { Profile } from "../../app/models/profile";
import { observer } from "mobx-react-lite";
import ProfileAbout from "./ProfileAbout";
import ProfileFollowings from "./ProfileFollowings";
import { useStore } from "../../app/store/store";

interface ProfileContentProps {
  profile: Profile;
}

const ProfileContent = ({
  profile,
}: ProfileContentProps) => {
  const { profileStore } = useStore();

  const panes = [
    {
      menuItem: "About",
      render: () => <ProfileAbout></ProfileAbout>,
    },
    {
      menuItem: "Photos",
      render: () => (
        <ProfilePhotos
          profile={profile}
        ></ProfilePhotos>
      ),
    },
    {
      menuItem: "Events",
      render: () => (
        <Tab.Pane>Events Content</Tab.Pane>
      ),
    },
    {
      menuItem: "Followers",
      render: () => (
        <ProfileFollowings></ProfileFollowings>
      ),
    },
    {
      menuItem: "Following",
      render: () => (
        <ProfileFollowings></ProfileFollowings>
      ),
    },
  ];
  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
      onTabChange={(_, data) =>
        profileStore.setActiveTab(
          data.activeIndex as number
        )
      }
    ></Tab>
  );
};

export default observer(ProfileContent);
