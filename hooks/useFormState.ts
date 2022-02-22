import { useContext } from 'react';
import { FormContext } from 'hooks/FormContext';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { GET_TASKS, GET_TASK_COMPLETE, GET_TASK_REMOVE } from 'graphql/query';

type Inputs = {
  title: string;
  description: string;
};

export const useFormState = (uid?: string) => {
  const { state, changeToDefault, changeToEdit } = useContext(FormContext);
  const { register, handleSubmit } = useForm<Inputs>();
  const [getMutation, { loading }] = useMutation(state.mutation, {
    refetchQueries: [GET_TASKS, GET_TASK_REMOVE, GET_TASK_COMPLETE],
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (state?.task) {
      // update task
      getMutation({
        variables: {
          task: { ...data, done: state.task.done },
          id: state.task.id,
          uid,
        },
      });
    } else {
      // create task
      getMutation({ variables: { task: { ...data, done: false }, uid } });
    }
  };

  return {
    state,
    changeToDefault,
    changeToEdit,
    register,
    handleSubmit: handleSubmit(onSubmit),
  };
};
