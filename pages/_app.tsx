import React from "react";
import type { AppProps } from "next/app";
import axios from "axios";
import { AuthProvider } from "../contexts/Auth";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import "../styles/globals.css";
import Header from "../components/Header";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      async queryFn(context) {
        const url = context.queryKey[0];

        if (typeof url !== "string")
          throw new Error("Only strings are allowed in query keys.");

        const { data } = await axios.get(url);
        return data;
      },
      staleTime: 5 * 60 * 1000,
      refetchOnMount: "always",
    },
  },
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Header />
        <Component {...pageProps} />
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
