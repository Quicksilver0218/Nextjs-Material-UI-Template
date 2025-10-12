import { useState, useCallback, useRef } from "react";

export default function useAsyncState<U = undefined>(
  func: () => Promise<U>
): [U | undefined, () => Promise<void>, boolean, () => void];

export default function useAsyncState<T, U = undefined>(
  func: (arg: T) => Promise<U>
): [U | undefined, (arg: T) => Promise<void>, boolean, () => void];

export default function useAsyncState<U>(
  func: () => Promise<U>,
  initialData: U
): [U, () => Promise<void>, boolean, () => void];

export default function useAsyncState<T, U>(
  func: (arg: T) => Promise<U>,
  initialData: U
): [U, (arg: T) => Promise<void>, boolean, () => void];

export default function useAsyncState<T, U>(
  func: (arg?: T) => Promise<U>,
  initialData?: U
): [U | undefined, (arg?: T) => Promise<void>, boolean, () => void] {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(initialData);
  const running = useRef([false]);
  const cancel = useCallback(() => {
    running.current[0] = false;
    setLoading(false);
  }, []);
  return [
    data,
    useCallback(
      (arg?: T) => {
        running.current[0] = false;
        const r = [true];
        running.current = r;
        setLoading(true);
        return func(arg)
          .then(result => {
            if (r[0]) setData(result);
          })
          .finally(() => {
            if (r[0]) setLoading(false);
          });
      },
      [func]
    ),
    loading,
    cancel
  ];
}