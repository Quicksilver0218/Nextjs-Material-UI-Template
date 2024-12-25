"use server";

import { validateForm } from "./sample-form-validator";

export default async function SampleFormHandler(prevState: Set<string>, formData: FormData) {
  "use server";
  return validateForm(formData);
};