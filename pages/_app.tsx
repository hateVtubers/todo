import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "components/Layout";
import { FormProvider } from "hooks/FormContext";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "apollo/client";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <FormProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Toaster
          toastOptions={{
            style: {
              background: "#0F1869",
              color: "#21F2F8",
            },
          }}
        />
      </FormProvider>
    </ApolloProvider>
  );
}

export default MyApp;
