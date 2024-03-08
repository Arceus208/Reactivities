import {
  ErrorMessage,
  Form,
  Formik,
} from "formik";
import React from "react";
import MyTextInput from "../../app/common/form/MyTextInput";
import {
  Button,
  Header,
  Label,
} from "semantic-ui-react";
import { useStore } from "../../app/store/store";
import { observer } from "mobx-react-lite";

const LoginForm = () => {
  const { userStore } = useStore();
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        error: null,
      }}
      onSubmit={(values, { setErrors }) =>
        userStore.login(values).catch(() =>
          setErrors({
            error: "Invalid email or password",
          })
        )
      }
    >
      {({
        handleSubmit,
        isSubmitting,
        errors,
      }) => (
        <Form
          className="ui form"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <Header
            as="h2"
            content="Login to Reactivities"
            color="teal"
            textAlign="center"
          ></Header>
          <MyTextInput
            placeholder="Email"
            name="email"
          ></MyTextInput>
          <MyTextInput
            placeholder="Password"
            name="password"
            type="password"
          ></MyTextInput>
          <ErrorMessage
            name="error"
            render={() => (
              <Label
                style={{ marginBottom: 10 }}
                basic
                color="red"
                content={errors.error}
              ></Label>
            )}
          ></ErrorMessage>
          <Button
            loading={isSubmitting}
            positive
            content="Login"
            type="submit"
            fluid
          ></Button>
        </Form>
      )}
    </Formik>
  );
};

export default observer(LoginForm);
