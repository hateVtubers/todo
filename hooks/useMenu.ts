import { useRef, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_TASKS, GET_TASK_COMPLETE, GET_TASK_REMOVE } from 'graphql/query';
import { Task } from 'graphql/resolvers';

type Query = {
  getTasks?: Task[];
  getTasksRemoves?: Task[];
  getTasksComplete?: Task[];
};

export const useMenu = ({ uid }: { uid: string }) => {
  const [query, setQuery] = useState({ query: GET_TASKS, state: 'All Tasks' });
  const { data, loading } = useQuery<Query>(query.query, {
    variables: { uid },
  });

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
    [
      'Tasks Completed',
      () => {
        setQuery({ query: GET_TASK_COMPLETE, state: 'Tasks Completed' });
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
