export function deleteUndefinedKeys(obj: any) {
  Object.keys(obj).forEach(key => {
    if (obj[key] === undefined)
      delete obj[key];
    else if (typeof obj[key] === 'object')
      deleteUndefinedKeys(obj[key]);
  });
}

export function createGetRequest(url: string, headers?: HeadersInit, params?: {[key: string]: string | string[]}) {
  let paramsStr;
	if (params !== undefined) {
		deleteUndefinedKeys(params);
    const searchParams = new URLSearchParams();
    Object.keys(params).forEach(key => {
      if (Array.isArray(params[key]))
        params[key].forEach((item: string) => searchParams.append(key + "[]", item));
      else
        searchParams.append(key, params[key]);
    });
    paramsStr = "?" + searchParams.toString();
  } else
    paramsStr = "";
  return new Request(url + paramsStr, {
    headers,
    method: "GET"
  });
}

export function createJsonRequest(url: string, method: string, headers?: HeadersInit, body?: object) {
  if (method.toUpperCase() === "GET")
    throw new Error("GET requests cannot have a body.");
  if (body !== undefined)
		deleteUndefinedKeys(body);
  return new Request(url, { method, headers: { "Content-Type": "application/json", ...headers }, body: JSON.stringify(body) });
}