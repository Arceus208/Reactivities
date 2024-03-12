import { Tab } from "semantic-ui-react";

import ProfilePhotos from "./ProfilePhotos";
import { Profile } from "../../app/models/profile";
import { observer } from "mobx-react-lite";
import ProfileAbout from "./ProfileAbout";

interface ProfileContentProps {
  profile: Profile;
}

const ProfileContent = ({
  profile,
}: ProfileContentProps) => {
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
        <Tab.Pane>Followers Content</Tab.Pane>
      ),
    },
    {
      menuItem: "Following",
      render: () => (
        <Tab.Pane>Following Content</Tab.Pane>
      ),
    },
  ];
  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
    ></Tab>
  );
};

export default observer(ProfileContent);
