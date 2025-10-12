import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { deleteUndefinedKeys } from "../utils/request-utils";

export type SearchParams = { [key: string]: string | string[] | undefined };

function parseSearchParams(params: URLSearchParams) {
  const obj: SearchParams = {};
  for (const [key, value] of params) {
    if (key in obj) {
      if (!Array.isArray(obj[key]))
        obj[key] = [obj[key] as string];
      obj[key].push(value);
    } else
      obj[key] = value;
  }
  return obj;
}

function searchParamsToString(params: SearchParams) {
  const pairs = [];
  for (const [key, value] of Object.entries(params))
    if (Array.isArray(value))
      for (const v of value)
        pairs.push(encodeURIComponent(key) + "=" + encodeURIComponent(v));
    else
      pairs.push(encodeURIComponent(key) + "=" + encodeURIComponent(value!));
  return pairs.join("&");
}

export type UrlState = { pathname: string; searchParams: SearchParams };
export type UrlStateValue = { pathname?: string; searchParams?: SearchParams };

function getState(currentState: UrlState, { pathname, searchParams }: UrlStateValue): UrlState {
  return {
    pathname: pathname ?? currentState.pathname,
    searchParams: searchParams ? deleteUndefinedKeys(searchParams) as SearchParams : currentState.searchParams
  };
}

function pushState(router: AppRouterInstance, { pathname, searchParams }: UrlState) {
  let searchParamsStr;
  if (Object.keys(searchParams).length)
    searchParamsStr = "?" + searchParamsToString(searchParams);
  else
    searchParamsStr = "";
  router.push(pathname + searchParamsStr, { scroll: false });
}

export default function useNavigation(): [UrlState, (arg: UrlStateValue | ((state: UrlState) => UrlStateValue)) => void] {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const state = useMemo(() => ({ pathname, searchParams: parseSearchParams(searchParams) }), [pathname, searchParams]);
  const router = useRouter();
  const setState = useCallback(
    (arg: UrlStateValue | ((state: UrlState) => UrlStateValue)) => {
      let value;
      if (typeof arg === "function")
        value = (arg as ((state: UrlState) => UrlStateValue))(state);
      else
        value = arg;
      const newState = getState(state, value);
      pushState(router, newState);
    }, [router, state]
  );
  return [state, setState];
}