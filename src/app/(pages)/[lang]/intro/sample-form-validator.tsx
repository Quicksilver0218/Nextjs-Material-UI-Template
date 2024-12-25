import rules from "./sample-form-validation-rules.json";
import { Validator } from "@quicksilver0218/object-validator";

const validator = new Validator(rules);

export function validateForm(formData: FormData) {
  const file = formData.get("image") as File;
  const data = {
    integer: formData.get("integer"),
    imageType: file?.type,
    imageSize: file?.size,
  };
  return validator.validate(data).failedFields;
};