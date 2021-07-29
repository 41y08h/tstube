import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import { useQuery } from "react-query";
import IVideo from "../interfaces/IVideo";

interface Props {
  data: IVideo;
}

const Watch: NextPage<Props> = (props) => {
  const { data } = useQuery(`/api/videos/${props.data.id}`, {
    initialData: props.data,
  });
  return <video autoPlay controls src={data.src} />;
};

export default Watch;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const videoId = ctx.query.v;
  const { data } = await axios.get(`http://localhost:5000/videos/${videoId}`);

  return { props: { data } };
};
