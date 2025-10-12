"use client";

import { DependencyList, EffectCallback, useEffect, useRef } from "react";

export default function useEffectSkipFirst(effect: EffectCallback, deps?: DependencyList) {
  const isFirst = useRef(true);
  useEffect(() => {
    if (isFirst.current)
      isFirst.current = false;
    else
      return effect();
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}