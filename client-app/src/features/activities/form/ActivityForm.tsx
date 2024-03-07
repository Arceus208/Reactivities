import React, {
  ChangeEvent,
  useState,
} from "react";
import {
  Button,
  Form,
  Segment,
} from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface ActivityFormProps {
  activity: Activity | undefined;
  closeForm: () => void;
  createOrEdit: (activity: Activity) => void;
  submitting: boolean;
}

const ActivityForm = ({
  activity: selectedActivity,
  closeForm,
  createOrEdit,
  submitting,
}: ActivityFormProps) => {
  const initialState = selectedActivity ?? {
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  };

  const [activity, setActivity] =
    useState(initialState);

  const handleSubmit = () => {
    createOrEdit(activity);
  };

  const handleInputChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  };

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
          loading={submitting}
        ></Button>

        <Button
          onClick={closeForm}
          floated="right"
          type="button"
          content="Cancel"
        ></Button>
      </Form>
    </Segment>
  );
};

export default ActivityForm;
