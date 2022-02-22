import { DecodedIdToken } from 'firebase-admin/auth';
import { User } from 'firebase/auth';
import Image from 'next/image';
import { Github } from './svg/Github';
import { Google } from './svg/Google';
import { Button } from 'components/Button';

export const Card = ({
  user,
}: {
  user: (DecodedIdToken & User) | null | undefined;
}) => {
  return (
    <>
      {user ? (
        <aside className='bg-downriver-400 flex h-12 w-full items-center justify-around rounded-md py-1.5'>
          {user ? (
            <>
              <div className='flex items-center gap-2'>
                <Image
                  src={user?.picture ?? (user?.photoURL as string)}
                  width={38}
                  height={38}
                  alt={user.uid}
                  className='rounded-full'
                />
                <h1 className='text-sm'>{user?.name ?? user.displayName}</h1>
              </div>
              <Button
                className='px-3 py-1 text-sm'
                onClick={async () => {
                  await import('auth').then(({ handleLogout }) =>
                    handleLogout()
                  );
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <h2>uwu</h2>
          )}
        </aside>
      ) : (
        <aside className='bg-downriver-400 flex h-12 w-full items-center justify-evenly rounded-md py-1.5'>
          <button
            onClick={async () => {
              await import('auth').then(({ signInWith }) =>
                signInWith('github')
              );
            }}
          >
            <Github />
          </button>
          <button
            onClick={async () => {
              await import('auth').then(({ signInWith }) =>
                signInWith('google')
              );
            }}
          >
            <Google />
          </button>
        </aside>
      )}
    </>
  );
};
