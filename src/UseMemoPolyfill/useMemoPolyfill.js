import { useEffect } from "react";
import { useRef } from "react";

export const useMemoPolyfill = (callback, deps) => {
  const memoizedRef = useRef(null);

  if (
    !memoizedRef.current ||
    dependencyChange(memoizedRef?.current?.deps, deps)
  ) {
    memoizedRef.current = {
      value: callback(),
      deps: deps,
    };
  }

  useEffect(() => {
    return () => {
      memoizedRef.current = null;
    };
  });
  return memoizedRef?.current.value;
};

function dependencyChange(prevDep, deps) {
  if (prevDep === null) {
    return true;
  } else if (prevDep.length !== deps.length) {
    return true;
  } else {
    for (let i = 0; i < deps.length; i++) {
      if (prevDep[i] !== deps[i]) {
        return true;
      }
    }
  }
  return false;
}
