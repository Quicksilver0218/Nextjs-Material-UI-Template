export function deleteUndefinedKeys(obj: { [key: string]: unknown }) {
  Object.keys(obj).forEach(key => {
    if (obj[key] === undefined)
      delete obj[key];
    else if (typeof obj[key] === "object")
      deleteUndefinedKeys(obj[key] as { [key: string]: unknown });
  });
}

export function createGetRequest(url: string, data?: { headers?: HeadersInit, params?: {[key: string]: string | string[] | undefined} }) {
  let paramsStr;
  const params = data?.params;
	if (params) {
		deleteUndefinedKeys(params);
    const searchParams = new URLSearchParams();
    Object.keys(params).forEach(key => {
      if (Array.isArray(params[key]))
        params[key].forEach((item: string) => searchParams.append(key + "[]", item));
      else
        searchParams.append(key, params[key]!);
    });
    paramsStr = "?" + searchParams.toString();
  } else
    paramsStr = "";
  return new Request(url + paramsStr, {
    headers: data?.headers,
    method: "GET"
  });
}

export function createJsonRequest(url: string, method: string, data?: { headers?: HeadersInit, body?: object }) {
  if (method.toUpperCase() === "GET")
    throw new Error("GET requests cannot have a body.");
  const body = data?.body;
  if (body !== undefined)
		deleteUndefinedKeys(body as { [key: string]: unknown });
  return new Request(url, { method, headers: { "Content-Type": "application/json", ...data?.headers }, body: JSON.stringify(body) });
}