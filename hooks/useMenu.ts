import { useRef, useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_TASKS, GET_TASK_REMOVE } from 'graphql/query';
import { Task } from 'graphql/resolvers';

type Query = {
  getTasks?: Task[];
  getTasksRemoves?: Task[];
  getTasksComplete?: Task[];
};

export const useMenu = ({ uid }: { uid: string | undefined }) => {
  const [query, setQuery] = useState({ query: GET_TASKS, state: 'All Tasks' });
  /*   const { data, loading } = useQuery<Query>(query.query, {
    variables: { uid },
  }); */
  const [getQuery, { data, loading }] = useLazyQuery<Query>(query.query, {
    variables: { uid },
  });

  useEffect(() => {
    uid && getQuery();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid]);

  const { current } = useRef<[string, () => void][]>([
    [
      'All Tasks',
      () => {
        setQuery({ query: GET_TASKS, state: 'All Tasks' });
      },
    ],
    [
      'Tasks Deleted',
      () => {
        setQuery({ query: GET_TASK_REMOVE, state: 'Tasks Deleted' });
      },
    ],
  ]);

  return {
    data,
    loading,
    classNames: query.state,
    links: current,
  };
};
