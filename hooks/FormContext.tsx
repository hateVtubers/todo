import { createContext, ReactNode, useReducer } from 'react';
import { reducer, init } from 'hooks/reducer';
import { Task } from 'graphql/resolvers';
import { CREATE_TASK } from 'graphql/mutations';

type ProviderValues = {
  state: {
    title: string;
    task?: Task;
    placeholder: {
      title: string;
      description: string;
    };
    mutation: typeof CREATE_TASK;
  };
  changeToEdit: (task: Task) => void;
  changeToDefault: () => void;
};

// @ts-ignore
export const FormContext = createContext<ProviderValues>();

const initialState = {
  title: 'Create Task',
  placeholder: {
    title: 'Task Title',
    description: 'Task Description',
  },
  mutation: CREATE_TASK,
};

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState, init);

  const changeToEdit = (task: Task) => {
    dispatch({ type: 'editing', payload: task });
  };

  const changeToDefault = () => {
    dispatch({ type: 'reset', payload: initialState });
  };

  return (
    <FormContext.Provider value={{ state, changeToEdit, changeToDefault }}>
      {children}
    </FormContext.Provider>
  );
};
