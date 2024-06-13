import React from "react";
import { useFormState } from "./form-context";
import EmailForm from "./email-form";
import PasswordForm from "./password-form";

const FormStep = () => {
  const { step } = useFormState();

  switch (step) {
    case 1:
      return <EmailForm />;
    case 2:
      return <PasswordForm />;
    default:
      return null;
  }
};

export default FormStep;
