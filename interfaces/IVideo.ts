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
