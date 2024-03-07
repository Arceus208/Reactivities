import {
  ChangeEvent,
  useEffect,
  useState,
} from "react";
import {
  Button,
  Form,
  Segment,
} from "semantic-ui-react";
import { v4 as uuid } from "uuid";

import { useStore } from "../../../app/store/store";
import { observer } from "mobx-react-lite";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Activity } from "../../../app/models/activity";
import LoadingComponent from "../../../app/layout/LoadingComponent";

const ActivityForm = () => {
  const { activityStore } = useStore();
  const {
    loadActivity,
    loadingInitial,
    createActivity,
    updateActivity,
    loading,
  } = activityStore;
  const { id } = useParams();
  const navigate = useNavigate();

  const [activity, setActivity] =
    useState<Activity>({
      id: "",
      title: "",
      category: "",
      description: "",
      date: "",
      city: "",
      venue: "",
    });

  useEffect(() => {
    if (id)
      loadActivity(id).then((activity) =>
        setActivity(activity!)
      );
  }, [id, loadActivity]);

  const handleSubmit = () => {
    if (!activity.id) {
      activity.id = uuid();
      createActivity(activity).then(() =>
        navigate(`/activities/${activity.id}`)
      );
    } else {
      updateActivity(activity).then(() =>
        navigate(`/activities/${activity.id}`)
      );
    }
  };

  const handleInputChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  };

  if (loadingInitial)
    return (
      <LoadingComponent content="Loading activity..."></LoadingComponent>
    );

  return (
    <Segment clearing>
      <Form
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <Form.Input
          placeholder="Title"
          value={activity.title}
          onChange={handleInputChange}
          name="title"
        ></Form.Input>

        <Form.TextArea
          placeholder="Description"
          value={activity.description}
          onChange={handleInputChange}
          name="description"
        ></Form.TextArea>

        <Form.Input
          placeholder="Category"
          value={activity.category}
          onChange={handleInputChange}
          name="category"
        ></Form.Input>

        <Form.Input
          type="date"
          placeholder="Date"
          value={activity.date}
          onChange={handleInputChange}
          name="date"
        ></Form.Input>

        <Form.Input
          placeholder="City"
          value={activity.city}
          onChange={handleInputChange}
          name="city"
        ></Form.Input>

        <Form.Input
          placeholder="Venue"
          value={activity.venue}
          onChange={handleInputChange}
          name="venue"
        ></Form.Input>

        <Button
          floated="right"
          positive
          type="submit"
          content="Submit"
          loading={loading}
        ></Button>

        <Button
          floated="right"
          type="button"
          content="Cancel"
          as={Link}
          to="/activities"
        ></Button>
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);
