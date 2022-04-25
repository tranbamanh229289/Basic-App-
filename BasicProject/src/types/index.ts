export interface RawCamera {
  id: string;
  name: string; //0979294748
  camera_location: string; // hành lang
  camera_url: string; // rtsp://x.x.x.x:port/
  falling_threshold: string;
  fighting_threshold: string;
  staggering_threshold: string;
  falling_sensitive: string;
  fighting_sensitive: string;
  staggering_sensitive: string;
  stay_mode: string;
  stay_interval: string;
  use_warning_area: boolean;
}

export interface RawProductType {
  $id: string;
  id: string;
  name: string;
  isDeleted: boolean;
}

export interface RawOrderProduct {
  $id: string;
  idOrder: number;
  idProduct: number;
  name: string;
  description: string;
  unit: string;
  price: number;
  quantity: number;
  inStock: boolean;
  listImage: string;
  type: string;
  manufacture: string;
  isStock: boolean;
  ngayCapNhat?: any;
  gioCapNhat?: any;
}
export interface RawCustomNotify {
  $id: string;
  contentHTML: string;
  id: number;
  isDeleted: boolean;
}

export interface RawComment {
  $id: string;
  $postId: string;
  name: string;
  email: string;
  body: string;
}

export interface RawUser {
  name: string;
  male: boolean;
  age: string;
  email: string;
  password: string;
}
