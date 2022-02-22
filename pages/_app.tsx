import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Layout } from 'components/Layout';
import { FormProvider } from 'hooks/FormContext';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from 'apollo/client';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <FormProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </FormProvider>
    </ApolloProvider>
  );
}

export default MyApp;
