import { SubmitEvent } from "react";

export async function onSubmit<T extends FormData | object | string>(
  e: SubmitEvent,
  options: {
    headers?: Record<string, string> | ((form: HTMLFormElement) => Record<string, string> | Promise<Record<string, string>>);
    preprocess?: (form: HTMLFormElement) => T | undefined | Promise<T | undefined>;
    success?: (res: Response, formData: T) => void | Promise<void>;
    fail?: (err: Error) => void | Promise<void>;
    complete?: () => void;
  } = {}
) {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  if (!form.checkValidity()) return;
  const formData = typeof options.preprocess === "function" ? await options.preprocess(form) : new FormData(form);
  if (formData === undefined) return;
  const method = form.getAttribute("method")?.toUpperCase() || "GET";
  const enctype = form.getAttribute("enctype") || "application/x-www-form-urlencoded;charset=UTF-8";
  let url = form.action || window.location.href;
  const request: RequestInit = { method };
  if (method === "GET") {
    url += "?";
    if (typeof formData === "string")
      url += formData;
    else if (formData instanceof FormData)
      url += new URLSearchParams(
        formData
          .entries()
          .filter(([, value]) => typeof value === "string")
          .toArray() as [string, string][]
      ).toString();
    else
      url += new URLSearchParams(Object.entries(formData)).toString();
  } else
    switch (enctype) {
      case "multipart/form-data":
        if (typeof formData === "string" || formData instanceof FormData)
          request.body = formData;
        else {
          request.body = new FormData();
          for (const key in formData)
            if (formData[key] != null)
              if (typeof formData[key] === "object")
                request.body.append(key, JSON.stringify(formData[key]));
              else
                request.body.append(key, String(formData[key]));
        }
      break;
      case "application/json":
        request.headers = { "Content-Type": "application/json" };
        if (typeof formData === "string")
          request.body = formData;
        else if (formData instanceof FormData) {
          const object: { [key: string]: unknown } = {};
          for (const [key, value] of formData.entries()) {
            let v;
            if (value instanceof File)
              v = await value
                .arrayBuffer()
                .then(buffer => new Uint8Array(buffer).toBase64());
            else v = value;
            if (!Reflect.has(object, key)) {
              object[key] = v;
              continue;
            }
            if (!Array.isArray(object[key])) object[key] = [object[key]];
            (object[key] as unknown[]).push(v);
          };
          request.body = JSON.stringify(object);
        } else
          request.body = JSON.stringify(formData);
      break;
      default:
        request.headers = { "Content-Type": enctype };
        if (typeof formData === "string")
          request.body = formData;
        else if (formData instanceof FormData)
          request.body = new URLSearchParams(
            formData
              .entries()
              .filter(([, value]) => typeof value === "string")
              .toArray() as [string, string][]
          ).toString();
        else
          request.body = new URLSearchParams(Object.entries(formData)).toString();
      break;
    }
  if (typeof options.headers === "function")
    options.headers = await options.headers(form);
  request.headers = { ...request.headers, ...options.headers };
  fetch(url, request).then(async res => {
    if (options.success) await options.success(res, formData as T);
  }).catch(async err => {
    if (options.fail) await options.fail(err);
  }).finally(() => {
    if (typeof options.complete === "function") options.complete();
  });
}