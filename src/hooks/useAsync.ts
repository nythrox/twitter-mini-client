import { useEffect, useState, useCallback } from "react";
import { promises } from "dns";
export type AsyncHookState<T> = {
  error?: any;
  loading: boolean;
  value?: T;
  status: FutureState;
};
export function useAsync<T>(promise: Promise<T>) {
  const [state, setState] = useState<AsyncHookState<T>>({
    loading: true,
    status: FutureState.pending
  });
  useEffect(() => {
    console.log("üse async");
    if (state.loading) {
      promise
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
  });
  return {
    error: state.error,
    loading: state.loading,
    status: state.status,
    value: state.value,
    promise
  };
}
export enum FutureState {
  fulfilled,
  rejected,
  pending
}
export type PromiseCallback<A,T> = (value: A) => Promise<T>;

export function useAsyncAfter<A,T>(
  after: Promise<A>,
  callback: PromiseCallback<A,T>,
  ...args: any
) {
  const [state, setState] = useState<
    AsyncHookState<T> & { promise?: Promise<T> }
  >({
    loading: true,
    status: FutureState.pending
  });
  useEffect(() => {
    if (state.loading) {
      if (!state.promise) {
        after.then(value => {
          setState({
            ...state,
            promise: callback(value)
          });
        });
      }
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
  });
  return {
    error: state.error,
    loading: state.loading,
    status: state.status,
    value: state.value,
    promise: state.promise
  };
}