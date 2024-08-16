import type { Dayjs } from "dayjs";

export interface IOrderChart {
  count: number;
  status:
    | "waiting"
    | "ready"
    | "on the way"
    | "delivered"
    | "could not be delivered";
}

export interface IOrderTotalCount {
  total: number;
  totalDelivered: number;
}

export interface ISalesChart {
  date: string;
  title?: "Order Count" | "Order Amount";
  value: number;
}

export interface IOrderStatus {
  id: number;
  text: "Pending" | "Ready" | "On The Way" | "Delivered" | "Cancelled";
}

export interface IUser {
  id: string;
  last_name: string;
  first_name: string;
  birth_date: string;
  email: string;
  username: string;
  status: UserStatus;
  sex: UserSex;
  role: UserRole;
  photo_url: string;
  profile_banner_url: string;
  entrance_datetime: string;
}

export interface IXxxxxx {
  id: number;
  creation_datetime: string;
  updated_at: string;
  user: IUser;
}

export type StatusEnum = 'PLANNING' | 'CONFIRMED' | 'COMPLETED';
export type StatusSessionEnum = 'NOT_STARTING' | 'IN_PROGRESS' | 'COMPLETED';
export type UserStatus = 'ENABLED' | 'DISABLED';  // Adjust according to the actual possible statuses
export type UserRole = 'TECHNICAL_SOLUTION' | 'INVESTOR' | 'MANAGER';  // Adjust according to the actual possible roles
export type UserSex = 'M' | 'F' | 'OTHER';  // Adjust according to the actual possible sexes

export interface IProjectCategory {
  id: string;
  name: string;
  description: string;
}

export interface IProjectSession {
  id: string;
  project: IProject;
  location: ILocation;
  status: StatusSessionEnum;
  title: string;
  description: string;
  end_datetime: string;
  like_number: number;
  view_number: number;
  star_medium:number;
  creation_datetime:string;
  updated_at:string
}

export interface IProject {
  id: string;
  user: IUser;
  title: string;
  description: string;
  categories: IProjectCategory[];
  investor: IUser;
  technicalSolution: IUser;
  sessions: IProjectSession[];
  status: StatusEnum;
  price: number;
  localisation: ILocation;
  start_datetime: string;
  end_datetime: string;
  need_investor: boolean;
  need_technical_solution: boolean;
  like_number: number;
  view_number: number;
  star_medium: number;
  image_url: string;
  picture_is_implemented: boolean;
  creation_datetime: string;
  updated_at: string;
}

export interface ILocation {
  id: string;
  name: string;
  description: string;
  latitude: string;  // Consider using number if latitude and longitude are numeric
  longitude: string; // Consider using number if latitude and longitude are numeric
  creation_datetime: string;
  updated_at: string;
}


export interface IYyyyyy {
  id: number;
  creation_datetime: string;
  updated_at: string;
  xxxxxx: IXxxxxx;
  zzzzzz: IZzzzzz;
}


export interface IZzzzzz {
  id: number;
  creation_datetime: string;
  updated_at: string;
}


export interface IIdentity {
  id: number;
  name: string;
  avatar: string;
}

export interface IAddress {
  text: string;
  coordinate: [number, number];
}

export interface IFile {
  name: string;
  percent: number;
  size: number;
  status: "error" | "success" | "done" | "uploading" | "removed";
  type: string;
  uid: string;
  url: string;
}

export interface IEvent {
  date: string;
  status: string;
}

export interface IStore {
  id: number;
  title: string;
  isActive: boolean;
  createdAt: string;
  gsm: string;
  email: string;
  address: IAddress;
  products: IProduct[];
}

export interface ICourierStatus {
  id: number;
  text: "Available" | "Offline" | "On delivery";
}

export interface ICourier {
  id: number;
  name: string;
  surname: string;
  email: string;
  gender: string;
  gsm: string;
  createdAt: string;
  accountNumber: string;
  licensePlate: string;
  address: string;
  avatar: IFile[];
  store: IStore;
  status: ICourierStatus;
  vehicle: IVehicle;
}

export interface IOrder {
  id: number;
  user: IUser;
  createdAt: string;
  products: IProduct[];
  status: IOrderStatus;
  adress: IAddress;
  store: IStore;
  courier: ICourier;
  events: IEvent[];
  orderNumber: number;
  amount: number;
}

export interface IProduct {
  id: number;
  name: string;
  isActive: boolean;
  description: string;
  images: (IFile & { thumbnailUrl?: string })[];
  createdAt: string;
  price: number;
  category: {
    id: number;
    title: string;
  };
  stock: number;
}

export interface ICategory {
  id: number;
  title: string;
  isActive: boolean;
}

export interface IOrderFilterVariables {
  q?: string;
  store?: string;
  user?: string;
  createdAt?: [Dayjs, Dayjs];
  status?: string;
}

export interface IUserFilterVariables {
  q: string;
  status: boolean;
  createdAt: [Dayjs, Dayjs];
  gender: string;
  isActive: boolean;
}

export interface IReview {
  id: number;
  order: IOrder;
  user: IUser;
  star: number;
  createDate: string;
  status: "pending" | "approved" | "rejected";
  comment: string[];
}

export type IVehicle = {
  model: string;
  vehicleType: string;
  engineSize: number;
  color: string;
  year: number;
  id: number;
};

export interface ITrendingProducts {
  id: number;
  product: IProduct;
  orderCount: number;
}
