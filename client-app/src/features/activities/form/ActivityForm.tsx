import { useEffect, useState } from "react";
import {
  Button,
  Header,
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
import { Formik, Form } from "formik";

import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
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
      date: null,
      city: "",
      venue: "",
    });

  const validationSchema = Yup.object({
    title: Yup.string().required(
      "The activity title is required"
    ),
    description: Yup.string().required(
      "The activity description is required"
    ),
    category: Yup.string().required(),
    date: Yup.string()
      .required("Date is required")
      .nullable(),
    venue: Yup.string().required(),
    city: Yup.string().required(),
  });

  useEffect(() => {
    if (id)
      loadActivity(id).then((activity) =>
        setActivity(activity!)
      );
  }, [id, loadActivity]);

  const handleFormSubmit = (
    activity: Activity
  ) => {
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

  if (loadingInitial)
    return (
      <LoadingComponent content="Loading activity..."></LoadingComponent>
    );

  return (
    <Segment clearing>
      <Header
        content="Activity details"
        sub
        color="teal"
      ></Header>
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={activity}
        onSubmit={(values) =>
          handleFormSubmit(values)
        }
      >
        {({
          handleSubmit,
          isValid,
          isSubmitting,
          dirty,
        }) => (
          <Form
            className="ui form"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <MyTextInput
              name="title"
              placeholder="Title"
            ></MyTextInput>

            <MyTextArea
              placeholder="Description"
              name="description"
              rows={3}
            ></MyTextArea>

            <MySelectInput
              placeholder="Category"
              name="category"
              options={categoryOptions}
            ></MySelectInput>

            <MyDateInput
              placeholderText="Date"
              name="date"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
            ></MyDateInput>

            <Header
              content="Location details"
              sub
              color="teal"
            ></Header>
            <MyTextInput
              placeholder="City"
              name="city"
            ></MyTextInput>

            <MyTextInput
              placeholder="Venue"
              name="venue"
            ></MyTextInput>

            <Button
              disabled={
                isSubmitting || !dirty || !isValid
              }
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
        )}
      </Formik>
    </Segment>
  );
};

export default observer(ActivityForm);
