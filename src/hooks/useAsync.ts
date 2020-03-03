import { useEffect, useState, useCallback } from "react";
export function useAsync<T>(promise: Promise<T>) {
    const [error, setError] = useState();
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setValue] = useState<T | void>();
    const [status, setStatus] = useState<FutureState>(FutureState.pending);
    useEffect(() => {
      promise
        .catch(e => {
          setError(e);
          setLoading(false);
          setStatus(FutureState.rejected);
        })
        .then(value => {
          setValue(value);
          setLoading(false);
          setStatus(FutureState.fulfilled);
        });
    }, []);
    return {
      error,
      loading,
      status,
      data
    };
  }
  export enum FutureState {
    fulfilled,
    rejected,
    pending
  }
  