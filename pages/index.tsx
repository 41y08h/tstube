import Link from "next/link";
import { useQuery } from "react-query";
import IVideo from "../interfaces/IVideo";
import styles from "../styles/Home.module.css";

export default function Home() {
  const { isLoading, data } = useQuery<IVideo[]>("/api/videos");

  if (isLoading) return <p>Loading ...</p>;

  return (
    <div>
      {data.map((video) => (
        <div className={styles.videoCard} key={video.id}>
          <Link href={`/watch?v=${video.id}`}>{video.title}</Link>
          <img src={video.thumbnail} alt={video.title} />
        </div>
      ))}
    </div>
  );
}
