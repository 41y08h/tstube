import { IChannel } from "./IUser";

export default interface IVideo {
  id: number;
  title: string;
  description: string;
  src: string;
  thumbnail: string;
  duration: number;
  userId: number;
  createdAt: Date;
}

export interface IVideoWithChannel extends IVideo {
  channel: IChannel;
}
