import { useEffect, useState, useCallback } from "react";
export type AsyncHookState<T> = {
  error?: any;
  loading: boolean;
  value?: T;
  status: FutureState;
};
type AsyncHookPromiseCallback<T> = () => Promise<T>;
export function useAsync<T>(promise: AsyncHookPromiseCallback<T>) {
  useEffect(() => {
    console.log("starting now:");
  }, []);
  const [state, setState] = useState<
    AsyncHookState<T> & { promise: Promise<T> }
  >(() => ({
    loading: true,
    status: FutureState.pending,
    promise: promise()
  }));

  useEffect(() => {
    state.promise
      .then(value => {
        setState({
          ...state,
          value: value,
          loading: false,
          status: FutureState.fulfilled
        });
      })
      .catch(e => {
        console.log(e);
        setState({
          ...state,
          loading: false,
          error: e,
          status: FutureState.rejected
        });
      });
  }, []);
  return {
    error: state.error,
    loading: state.loading,
    status: state.status,
    value: state.value,
    promise: state.promise
  };
}
export enum FutureState {
  fulfilled,
  rejected,
  pending
}
export type PromiseCallback<A, T> = (value: A) => Promise<T>;

export function useAsyncAfter<A, T>(
  after: Promise<A>,
  callback: PromiseCallback<A, T>
) {
  const [state, setState] = useState<
    AsyncHookState<T> & { promise?: Promise<T>; didShoot: boolean }
  >({
    loading: true,
    status: FutureState.pending,
    didShoot: false
  });
  useEffect(() => {
    after.then(value => {
      setState(() => ({
        ...state,
        promise: callback(value),
        didShoot: true
      }));
    });
  }, []);
  useEffect(() => {
    if (state.loading) {
      if (state.promise) {
        state.promise
          .then(value => {
            setState({
              ...state,
              value: value,
              loading: false,
              status: FutureState.fulfilled
            });
          })
          .catch(e => {
            setState({
              ...state,
              loading: false,
              error: e,
              status: FutureState.rejected
            });
          });
      }
    }
  }, [state.loading, state.promise]);
  return {
    error: state.error,
    loading: state.loading,
    status: state.status,
    value: state.value,
    promise: state.promise
  };
}

export function useAsyncAfterChain<A, T>(
  callback: PromiseCallback<A, T>,
  after?: Promise<A>
) {
  const [state, setState] = useState<
    AsyncHookState<T> & { promise?: Promise<T>; didShoot: boolean }
  >({
    loading: true,
    status: FutureState.pending,
    didShoot: false
  });
  useEffect(() => {
    console.log(state.promise);
    if (after && !state.promise && !state.didShoot) {
      after.then(value => {
        setState(() => ({
          ...state,
          promise: state.promise ? state.promise : callback(value),
          didShoot: true
        }));
      });
    }
  });
  useEffect(() => {
    if (state.loading) {
      if (state.promise) {
        state.promise
          .then(value => {
            setState({
              ...state,
              value: value,
              loading: false,
              status: FutureState.fulfilled
            });
          })
          .catch(e => {
            setState({
              ...state,
              loading: false,
              error: e,
              status: FutureState.rejected
            });
          });
      }
    }
  }, [state.loading, state.promise]);
  return {
    error: state.error,
    loading: state.loading,
    status: state.status,
    value: state.value,
    promise: state.promise
  };
}