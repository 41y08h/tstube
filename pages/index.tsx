import axios from "axios";
import Link from "next/link";
import { useInfiniteQuery } from "react-query";
import IPaginatedPage from "../interfaces/IPaginatedPage";
import IVideo from "../interfaces/IVideo";
import styles from "../styles/Home.module.css";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function Home() {
  const { isLoading, data, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery<IPaginatedPage<IVideo>>(
      "/api/videos",
      ({ pageParam = 1 }) =>
        axios
          .get("/api/videos", { params: { page: pageParam } })
          .then((res) => res.data),
      {
        getNextPageParam: (lastPage) =>
          lastPage.hasMore ? lastPage.page + 1 : undefined,
      }
    );
  const [bottomRef, isAtBottom] = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (isAtBottom) fetchNextPage();
  }, [isAtBottom, fetchNextPage]);

  if (isLoading) return <p>Loading ...</p>;

  return (
    <div>
      {data.pages.map((page) =>
        page.items.map((video) => (
          <div className={styles.videoCard} key={video.id}>
            <Link href={`/watch?v=${video.id}`}>{video.title}</Link>
            <img src={video.thumbnail} alt={video.title} />
          </div>
        ))
      )}
      <div ref={bottomRef}>{isFetchingNextPage && <p>Loading...</p>}</div>
    </div>
  );
}
