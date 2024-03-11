import { observer } from "mobx-react-lite";

import {
  Button,
  Card,
  Grid,
  Header,
  Image,
  Tab,
} from "semantic-ui-react";
import {
  Photo,
  Profile,
} from "../../app/models/profile";
import { useStore } from "../../app/store/store";
import { SyntheticEvent, useState } from "react";
import PhotoUploadWidget from "../../app/common/imageUpload/PhotoUploadWidget";

interface ProfilePhotosProps {
  profile: Profile;
}

const ProfilePhotos = ({
  profile,
}: ProfilePhotosProps) => {
  const {
    profileStore: {
      isCurrentUser,
      uploadPhoto,
      uploading,
      loading,
      setMainPhoto,
      deletePhoto,
    },
  } = useStore();
  const [addPhotoMode, setAddPhotoMode] =
    useState(false);
  const [target, setTarget] = useState("");

  const handlePhotoUpload = (file: Blob) => {
    uploadPhoto(file).then(() =>
      setAddPhotoMode(false)
    );
  };

  const handleSetMainPhoto = (
    photo: Photo,
    e: SyntheticEvent<HTMLButtonElement>
  ) => {
    setTarget(e.currentTarget.name);
    setMainPhoto(photo);
  };

  const handleDeletePhoto = (
    photo: Photo,
    e: SyntheticEvent<HTMLButtonElement>
  ) => {
    setTarget(e.currentTarget.name);
    deletePhoto(photo);
  };
  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header
            icon="image"
            content="Photos"
            floated="left"
          ></Header>
          {isCurrentUser && (
            <Button
              floated="right"
              basic
              content={
                addPhotoMode
                  ? "Cancel"
                  : "Add photo"
              }
              onClick={() =>
                setAddPhotoMode(!addPhotoMode)
              }
            ></Button>
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {addPhotoMode ? (
            <PhotoUploadWidget
              uploadPhoto={handlePhotoUpload}
              loading={uploading}
            ></PhotoUploadWidget>
          ) : (
            <Card.Group itemsPerRow={5}>
              {profile.photos?.map((photo) => (
                <Card key={photo.id}>
                  <Image src={photo.url}></Image>
                  {isCurrentUser && (
                    <Button.Group
                      fluid
                      widths={2}
                    >
                      <Button
                        basic
                        color="green"
                        content="Main"
                        name={"main" + photo.id}
                        disabled={photo.isMain}
                        loading={
                          target ===
                            "main" + photo.id &&
                          loading
                        }
                        onClick={(e) =>
                          handleSetMainPhoto(
                            photo,
                            e
                          )
                        }
                      ></Button>
                      <Button
                        basic
                        color="red"
                        icon="trash"
                        loading={
                          target === photo.id &&
                          loading
                        }
                        onClick={(e) =>
                          handleDeletePhoto(
                            photo,
                            e
                          )
                        }
                        disabled={photo.isMain}
                        name={photo.id}
                      ></Button>
                    </Button.Group>
                  )}
                </Card>
              ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(ProfilePhotos);
