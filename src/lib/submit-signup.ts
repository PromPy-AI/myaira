import { createServerFn } from "@tanstack/react-start";
import { signupSchema } from "./google-form-config";

export const submitSignup = createServerFn({ method: "POST" })
  .validator(signupSchema)
  .handler(async ({ data }) => {
    const { submitGoogleForm } = await import("./google-forms.server");
    return submitGoogleForm(data);
  });
