import { useFormState } from 'hooks/useFormState';
import { useMenu } from 'hooks/useMenu';
import { useState } from 'react';
import { Loading } from './Loading';
import { MiniCard } from './MiniCard';
import { TaskItems } from './TaskItems';

export const Menu = ({ uid }: { uid: string }) => {
  const { data, loading, classNames, links } = useMenu({ uid });
  const { state } = useFormState();
  console.log(state);

  return (
    <>
      <div className='bg-downriver-400 rounded'>
        <nav>
          <ul className='grid grid-cols-3 place-content-center'>
            {links.map(([title, onClick]) => (
              <li key={title}>
                <button
                  className={`h-full w-full rounded py-2.5 px-3 text-center font-semibold transition-colors ${
                    classNames === title
                      ? 'text-downriver-500 bg-robin-s-egg-blue-300'
                      : 'hover:bg-robin-s-egg-blue-300 hover:text-downriver-400'
                  } ${!uid && 'cursor-not-allowed'}`}
                  onClick={onClick}
                  disabled={!uid}
                >
                  {title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <main className={`h-96 overflow-auto ${loading && 'grid place-items-center'}`}>
          {loading ? (
            <Loading width={40} height={40} />
          ) : (
            <TaskItems
              data={
                data?.getTasks ??
                data?.getTasksComplete ??
                data?.getTasksRemoves
              }
              uid={uid}
            />
          )}
        </main>
      </div>
      <MiniCard uid={uid} id={state?.task?.id} />
    </>
  );
};
