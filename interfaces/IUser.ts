export default interface IUser {
  id: number;
  name: string;
  email: string;
  picture: string;
  createdAt: Date;
  gid: string;
}

export interface IChannel {
  id: number;
  name: string;
  picture: string;
}
