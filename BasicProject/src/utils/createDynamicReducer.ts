import {createSlice, PayloadAction, Store} from '@reduxjs/toolkit';
import _ from 'lodash';
import {useSelector} from 'react-redux';

export type DynamicState<T> = {
  byKey: Record<string, T>;
  query: Record<string, string[]>;
};

export const createDynamicReducer = <T extends {[x: string]: any}>(
  name: string, //"camera"
  mainKey: string, //"id"
  initialState: DynamicState<T> = {byKey: {}, query: {}},
) => {
  const {actions, reducer} = createSlice({
    name,
    initialState: initialState,
    reducers: {
      //add, update, Camera
      multiSet(state, action: PayloadAction<T[]>): DynamicState<T> {
        return {
          ...state,
          byKey: {
            ...state.byKey,
            ..._.fromPairs(action.payload.map(item => [item[mainKey], item])),
          },
        };
      },

      //add, delete, update id camera
      setQueries(
        state,
        action: PayloadAction<Record<string, string[]>>,
      ): DynamicState<T> {
        return {
          ...state,
          query: {
            ...state.query,
            ...action.payload,
          },
        } as DynamicState<T>;
      },

      //delete camera
      deleteByKey: (state, action: PayloadAction<string>) => {
        const obj = {...state};
        delete obj.byKey[action.payload];
      },

      //reset list camera
      reset(): DynamicState<T> {
        return {
          ...initialState,
        } as DynamicState<T>;
      },
    },
  });

  //get camera by id / list camera
  const useByKey = (key?: string): T | undefined => {
    // @ts-ignore
    return useSelector(state => state[name].byKey[key]);
  };

  const emptyArray: string[] = [];

  //get list id camera
  const useKeysByQuery = (query: string = 'default'): string[] => {
    // @ts-ignore
    return useSelector(state => state[name].query[query]) || emptyArray;
  };

  let _store: Store | undefined;

  //setStore
  const setStore = (store: Store) => {
    _store = store;
  };

  //getStore
  const _getStore = (): Store => {
    if (!_store) {
      throw new Error(
        'You need to run setStore right after init store to use this function',
      );
    }

    return _store;
  };

  //get Camera by key
  const getByKey = (key: string): T => {
    return _getStore().getState()[name].byKey[key];
  };

  //get list camera
  const getKeysByQuery = (query: string): string[] => {
    return _getStore().getState()[name].query[query] || emptyArray;
  };

  //dispatch add camera
  const sync = (items: T[]) => {
    return _getStore().dispatch(actions.multiSet(items));
  };

  //dispatch add id camera
  const setQueries = (queries: Record<string, string[]>) => {
    return _getStore().dispatch(actions.setQueries(queries));
  };

  const deleteByKey = (item: string) => {
    return _getStore().dispatch(actions.deleteByKey(item));
  };

  //dispatch reset store
  const reset = () => {
    return _getStore().dispatch(actions.reset());
  };

  return {
    name,
    actions,
    reducer,
    useByKey,
    useKeysByQuery,
    getByKey,
    getKeysByQuery,
    setStore,
    sync,
    setQueries,
    deleteByKey,
    reset,
  };
};
