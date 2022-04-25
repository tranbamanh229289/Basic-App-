import {createDynamicReducer} from '@/utils/createDynamicReducer';
import {RawCamera} from '@/types';
import {batch, useSelector} from 'react-redux';
import getStore from '@/store/getStore';

const {
  setStore,
  reducer,
  sync,
  useByKey,
  setQueries,
  useKeysByQuery,
  deleteByKey,
  getByKey,
} = createDynamicReducer<RawCamera>('camera', 'id');

export const setCameraStore = setStore;
export const cameraReducer = reducer;
export const useCamera = useByKey;
export const useCamerasByQuery = useKeysByQuery;

export const syncCameras = sync;
export const setCameraQueries = setQueries;
export const deleteCameras = deleteByKey;
export const getCameras = getByKey;

export const syncAllCameras = (accessories: RawCamera[]) => {
  let ids: string[] = [];

  for (let access of accessories) {
    ids.push(access.id.toString());
  }

  batch(() => {
    syncCameras(accessories);
    setCameraQueries({
      all: [...(getStore().getState().cameras.query['all'] || []), ...ids],
    });
  });
};

export const syncDeleteCameras = (id: string) => {
  let ids: string[] = [...(getStore().getState().cameras.query['all'] || [])];
  let newIds = ids.filter(item => item !== id);
  batch(() => {
    deleteCameras(id);
    setCameraQueries({
      all: [...newIds],
    });
  });
};

export const syncUpdateCameras = (accessories: RawCamera[]) => {
  let ids: string[] = [];

  for (let access of accessories) {
    ids.push(access.id.toString());
  }

  batch(() => {
    syncCameras(accessories);
  });
};
