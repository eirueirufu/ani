"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://graphql.anilist.co",
  cache: new InMemoryCache(),
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <NextUIProvider>{children}</NextUIProvider>
    </ApolloProvider>
  );
}
