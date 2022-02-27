import { useContext } from 'react';
import { FormContext } from 'hooks/FormContext';
import { useMutation } from '@apollo/client';
import { SubmitHandler } from 'react-hook-form';
import { Inputs } from 'components/Form';
import { GET_TASKS, GET_TASK_REMOVE } from 'graphql/query';

export const useCrud = (uid?: string) => {
  const {
    state: { mutation, ...res },
    ...dispach
  } = useContext(FormContext);
  const [getMutation] = useMutation(mutation, {
    refetchQueries: [
      {
        query: GET_TASKS,
        variables: {
          uid,
        },
      },
      {
        query: GET_TASK_REMOVE,
        variables: {
          uid,
        },
      },
    ],
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // @ts-ignore
    if (Object.hasOwn(res, 'task')) {
      // update task
      getMutation({
        variables: {
          task: data,
          id: res.task?.id,
          uid: uid,
        },
      });
    } else {
      // create task
      getMutation({
        variables: {
          task: data,
          uid: uid,
        },
      });
    }
  };

  return {
    ...dispach,
    formState: { ...res },
    getMutation,
    onSubmit,
  };
};
