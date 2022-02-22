import type { GetServerSideProps, NextPage } from 'next';
import { auth } from 'db/client';
import { getSessionUser, useAuth } from 'next-firebase-auth-cookies';
import { DecodedIdToken } from 'firebase-admin/auth';
import { Form } from 'components/Form';
import { Card } from 'components/Card';
import { User } from 'firebase/auth';
import { Menu } from 'components/Menu';

type Props = {
  userSSR: DecodedIdToken | null;
};

const Home: NextPage<Props> = ({ userSSR }) => {
  const { user } = useAuth({ auth, userSSR });
  console.log({ user });

  return (
    <main className='grid min-h-screen grid-cols-2 place-items-center'>
      <div className='flex flex-col items-center gap-2.5'>
        <Card user={user as DecodedIdToken & User} />
        <Form disabled={!user} uid={user?.uid as string} />
      </div>
      <div>
        <Menu uid={user?.uid as string} />
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const { auth } = await import('db/server');
  const userSessionState = await getSessionUser(auth, { req, res }); // auth from firebase admin

  return {
    props: {
      userSSR: userSessionState ?? null,
    },
  };
};

export default Home;
