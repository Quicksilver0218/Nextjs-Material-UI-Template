import { FormEvent } from "react";

export async function onSubmit(
  e: FormEvent,
  options: {
    beforeSend?: (form: HTMLFormElement) => void | false;
    success?: (res: Response) => void;
    fail?: (err: Error) => void;
    complete?: () => void;
  } = {}
) {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  if (!form.checkValidity()) return;
  if (
    typeof options.beforeSend === "function" &&
    options.beforeSend(form) === false
  )
    return;
  const formData = new FormData(form);
  const method = form.method?.toUpperCase() || "GET";
  const enctype = form.enctype || "application/x-www-form-urlencoded";
  const searchString = new URLSearchParams(
    formData
      .entries()
      .filter(([, value]) => typeof value === "string")
      .toArray() as [string, string][]
  ).toString();
  const url =
    (form.action || window.location.href) +
    (method === "GET" ? `?${searchString}` : "");
  const request: RequestInit = { method };
  if (method !== "GET")
    switch (enctype) {
      case "multipart/form-data":
        request.body = formData;
        break;
      case "application/json":
        request.headers = {
          "Content-Type": "application/json",
        };
        const object: { [key: string]: unknown } = {};
        for (const [key, value] of formData.entries()) {
          let v;
          if (value instanceof File)
            v = await value
              .arrayBuffer()
              .then((buffer) =>
                btoa(String.fromCharCode(...new Uint8Array(buffer)))
              );
          else v = value;
          if (!Reflect.has(object, key)) {
            object[key] = v;
            return;
          }
          if (!Array.isArray(object[key])) object[key] = [object[key]];
          (object[key] as unknown[]).push(v);
        };
        request.body = JSON.stringify(object);
        break;
      default:
        request.headers = {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        };
        request.body = searchString;
        break;
    }
  const promise = fetch(url, request);
  promise.then((res) => {
    if (typeof options.success === "function") options.success(res);
  });
  promise.catch((reason) => {
    if (typeof options.fail === "function") options.fail(reason);
  });
  promise.finally(() => {
    if (typeof options.complete === "function") options.complete();
  });
}
