import type { GetServerSideProps, NextPage } from 'next';
import { auth } from 'db/client';
import { userSessionState, useAuth } from 'next-firebase-auth-cookies';
import { Form } from 'components/Form';
import { Card } from 'components/Card';
import { Menu } from 'components/Menu';
import { UserServer } from 'next-firebase-auth-cookies/types';

type Props = {
  userSSR: UserServer;
};

const Home: NextPage<Props> = ({ userSSR }) => {
  const { user } = useAuth({ auth, userSSR });

  return (
    <main className='grid min-h-screen grid-cols-2 place-items-center'>
      <div className='flex flex-col items-center gap-2.5'>
        <Card user={user} />
        <Form disabled={!user} uid={user?.uid} />
      </div>
      <div>
        <Menu uid={user?.uid as string} />
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const { auth } = await import('db/server');
  const { user } = await userSessionState(auth, { req, res }); // auth from firebase admin

  return {
    props: {
      userSSR: user,
    },
  };
};

export default Home;
