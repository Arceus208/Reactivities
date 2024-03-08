import {
  ErrorMessage,
  Form,
  Formik,
} from "formik";

import MyTextInput from "../../app/common/form/MyTextInput";
import {
  Button,
  Header,
} from "semantic-ui-react";
import { useStore } from "../../app/store/store";
import { observer } from "mobx-react-lite";
import * as Yup from "yup";
import ValidationError from "../errors/ValidationError";

const RegisterForm = () => {
  const { userStore } = useStore();
  return (
    <Formik
      initialValues={{
        displayName: "",
        username: "",
        email: "",
        password: "",
        error: null,
      }}
      onSubmit={(values, { setErrors }) =>
        userStore.login(values).catch((error) =>
          setErrors({
            error,
          })
        )
      }
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
        username: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required(),
      })}
    >
      {({
        handleSubmit,
        isSubmitting,
        errors,
        isValid,
        dirty,
      }) => (
        <Form
          className="ui form error"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <Header
            as="h2"
            content="Signup to Reactivities"
            color="teal"
            textAlign="center"
          ></Header>
          <MyTextInput
            placeholder="Display name"
            name="displayName"
          ></MyTextInput>
          <MyTextInput
            placeholder="Username"
            name="username"
          ></MyTextInput>
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
              <ValidationError
                errors={
                  errors.error as unknown as string[]
                }
              ></ValidationError>
            )}
          ></ErrorMessage>
          <Button
            disabled={
              !isValid || !dirty || isSubmitting
            }
            loading={isSubmitting}
            positive
            content="Register"
            type="submit"
            fluid
          ></Button>
        </Form>
      )}
    </Formik>
  );
};

export default observer(RegisterForm);
