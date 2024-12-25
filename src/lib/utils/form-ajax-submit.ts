import { FormEvent } from "react";

export function onSubmit(
  e: FormEvent,
  options: {
    beforeSend?: (form: HTMLFormElement) => void | false;
    success?: (res: Response) => void;
    fail?: (err: Error) => void;
    complete?: () => void;
  } = {},
) {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  if (!form.checkValidity()) return;
  if (typeof options.beforeSend === "function" && options.beforeSend(form) === false) return;
  const formData = new FormData(form);
  const method = form.method?.toUpperCase() || "GET";
  const enctype = form.enctype || "application/x-www-form-urlencoded";
  const url =
    (form.action || window.location.href) +
    (method === "GET" ? `?${new URLSearchParams(formData as any).toString()}` : "");
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
        const object: { [key: string]: any } = {};
        formData.forEach((value, key) => {
          if (!Reflect.has(object, key)) {
            object[key] = value;
            return;
          }
          if (!Array.isArray(object[key])) object[key] = [object[key]];
          object[key].push(value);
        });
        request.body = JSON.stringify(object);
        break;
      default:
        request.headers = {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        };
        request.body = new URLSearchParams(formData as any).toString();
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
};
