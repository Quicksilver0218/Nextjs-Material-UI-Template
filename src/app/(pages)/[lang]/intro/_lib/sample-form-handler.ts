"use server";

import { validateForm } from "./sample-form-validator";

export default async function getSampleFormResponse(formData: FormData) {
  return validateForm(formData);
}