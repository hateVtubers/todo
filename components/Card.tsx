import Image from 'next/image';
import { Github } from './svg/Github';
import { Google } from './svg/Google';
import { Button } from 'components/Button';
import { UserClient } from 'next-firebase-auth-cookies/types';

export const Card = ({ user }: { user: UserClient }) => {
  
  return (
    <>
      {user ? (
        <aside className='flex h-12 w-full items-center justify-around rounded-md bg-downriver-400 py-1.5'>
          <div className='flex items-center gap-2'>
            <Image
              src={user.photoURL as string}
              width={38}
              height={38}
              alt={user.uid}
              className='rounded-full'
            />
            <h1 className='text-sm'>{user.displayName}</h1>
          </div>
          <Button
            className='px-3 py-1 text-sm'
            onClick={async () => {
              await import('auth').then(({ handleLogout }) => handleLogout());
            }}
          >
            Logout
          </Button>
        </aside>
      ) : (
        <aside className='flex h-12 w-full items-center justify-evenly rounded-md bg-downriver-400 py-1.5'>
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
