import {createDynamicReducer} from '@/utils/createDynamic';
import {batch} from 'react-redux';
import {RawUser} from '@/types';

const {
  setStore,
  reducer,
  actions,
  addByKeyAction,
  removeByKeyAction,
  updateKeyAction,
  getByKey,
  getListKey,
  getListByKey,
} = createDynamicReducer<RawUser>('users', 'email');

export {
  setStore as setUserStore,
  reducer as userReducer,
  addByKeyAction,
  removeByKeyAction,
  updateKeyAction,
  getByKey,
  getListKey,
  getListByKey,
};

export const syncAddUser = (user: RawUser) => {
  const mainKey: string | undefined = user.email;
  const keys: string[] = getListKey('all') || [];
  const newKeys: string[] = mainKey ? [...keys, mainKey] : [...keys];
  batch(() => {
    addByKeyAction(user);
    updateKeyAction({all: newKeys});
  });
};

export const syncDeleteUser = (key: string) => {
  const keys: string[] = getListKey('all') || [];
  const newKeys: string[] = keys.filter(item => item !== key);
  batch(() => {
    removeByKeyAction(key);
    updateKeyAction({all: newKeys});
  });
};

export const syncUpdateUser = (comment: RawUser) => {
  batch(() => {
    addByKeyAction(comment);
  });
};

export const checkAccountDuplicate = (key: string) => {
  if (getByKey(key)) {
    return false;
  }
  return true;
};

export const login = (email: string, passwordCheck: string): boolean => {
  const user: RawUser | undefined = getByKey(email);
  if (user) {
    const password = user.password;
    if (password === passwordCheck) {
      updateKeyAction({currentKey: [email]});
      return true;
    }
  }
  return false;
};
export const logout = () => {
  return updateKeyAction({currentKey: []});
};

export const checkAuth = (): boolean => {
  const currentKey: string[] = getListKey('currentKey');
  if (currentKey?.length && currentKey) {
    return true;
  }
  return false;
};

export const getCurrentUser = () => {
  const key = getListKey('currentKey')[0];
  return getByKey(key);
};
