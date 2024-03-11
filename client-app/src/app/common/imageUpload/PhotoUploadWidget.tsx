import {
  Button,
  Grid,
  Header,
} from "semantic-ui-react";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";
import { useEffect, useState } from "react";
import PhotoWidgetCropper from "./PhotoWidgetCropper";

interface PhotoUploadWidgetProps {
  loading: boolean;
  uploadPhoto: (file: Blob) => void;
}

const PhotoUploadWidget = ({
  loading,
  uploadPhoto,
}: PhotoUploadWidgetProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [files, setFiles] = useState<any>([]);
  const [cropper, setCroppper] =
    useState<Cropper>();

  const onCrop = () => {
    if (cropper) {
      cropper
        .getCroppedCanvas()
        .toBlob((blob) => uploadPhoto(blob!));
    }
  };

  useEffect(() => {
    return () => {
      files.forEach(
        (file: object & { preview?: string }) =>
          URL.revokeObjectURL(file.preview!)
      );
    };
  }, [files]);

  return (
    <Grid>
      <Grid.Column width={4}>
        <Header
          color="teal"
          sub
          content="Step 1 - Add Photo"
        ></Header>
        <PhotoWidgetDropzone
          setFiles={setFiles}
        ></PhotoWidgetDropzone>
      </Grid.Column>
      <Grid.Column width={1}></Grid.Column>
      <Grid.Column width={4}>
        <Header
          color="teal"
          sub
          content="Step 2 - Resize image"
        ></Header>
        {files && files.length > 0 && (
          <PhotoWidgetCropper
            setCropper={setCroppper}
            imagePreview={files[0].preview}
          ></PhotoWidgetCropper>
        )}
      </Grid.Column>
      <Grid.Column width={1}></Grid.Column>
      <Grid.Column width={4}>
        <Header
          color="teal"
          sub
          content="Step 3 - Preview & Upload"
        ></Header>
        {files && files.length > 0 && (
          <>
            <div
              className="img-preview"
              style={{
                minHeight: 200,
                overflow: "hidden",
              }}
            ></div>
            <Button.Group widths={2}>
              <Button
                onClick={onCrop}
                positive
                loading={loading}
                icon="check"
              ></Button>
              <Button
                disabled={loading}
                onClick={() => setFiles([])}
                icon="close"
              ></Button>
            </Button.Group>
          </>
        )}
      </Grid.Column>
    </Grid>
  );
};

export default PhotoUploadWidget;
