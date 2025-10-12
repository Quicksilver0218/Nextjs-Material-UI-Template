"use server";

import { validateForm } from "./sample-form-validator";

export default async function sampleFormHandler(formData: FormData) {
  return validateForm(formData);
}