import {createSlice, PayloadAction, Store} from '@reduxjs/toolkit';

export type DynamicType<T> = {
  byKey: Record<string, T>;
  keys: Record<string, string[]>;
};

export const createDynamicReducer = <T extends {[x: string]: any}>(
  name: string,
  mainKey: string,
  initialState: DynamicType<T> = {byKey: {}, keys: {}},
) => {
  const {actions, reducer} = createSlice({
    name,
    initialState,
    reducers: {
      addByKey(state, action: PayloadAction<T>): DynamicType<T> {
        const key = action.payload[mainKey];
        return {
          ...state,
          byKey: {
            ...state.byKey,
            [key]: action.payload,
          },
        } as DynamicType<T>;
      },
      updateKey(
        state,
        action: PayloadAction<Record<string, string[]>>,
      ): DynamicType<T> {
        return {
          ...state,
          keys: {
            ...state.keys,
            ...action.payload,
          },
        } as DynamicType<T>;
      },
      deleteByKey(state, action: PayloadAction<string>) {
        const obj = {...state};
        const key = action.payload;
        delete obj.byKey[key];
        return obj;
      },
    },
  });

  let _store: Store | undefined;

  const setStore = (store: Store) => {
    _store = store;
  };

  const getStore = (): Store => {
    if (!_store) {
      throw new Error(
        'You need to run setStore right after init store to use this function',
      );
    }
    return _store;
  };

  const getByKey = (key: string): T => {
    return getStore().getState()[name].byKey[key];
  };

  const getListByKey = (): Record<string, T> => {
    return getStore().getState()[name].byKey;
  };

  const getListKey = (key: string): string[] => {
    return getStore().getState()[name].keys[key];
  };

  const addByKeyAction = (val: T) => {
    return getStore().dispatch(actions.addByKey(val));
  };
  const updateKeyAction = (val: Record<string, string[]>) => {
    return getStore().dispatch(actions.updateKey(val));
  };
  const removeByKeyAction = (val: string) => {
    return getStore().dispatch(actions.deleteByKey(val));
  };

  return {
    name,
    setStore,
    getStore,
    actions,
    reducer,
    addByKeyAction,
    removeByKeyAction,
    updateKeyAction,
    getByKey,
    getListKey,
    getListByKey,
  };
};
