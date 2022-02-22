import { UPDATE_TASK } from 'graphql/mutations';
import { Task } from 'graphql/resolvers';

type InitialState = {
  title: string;
  placeholder: {
    title: string;
    description: string;
  };
  mutation: typeof UPDATE_TASK;
};

type Action = {
  type: 'editing' | 'reset';
  payload: Task | InitialState;
};

export const init = (initialState: InitialState) => {
  return {
    ...initialState,
  };
};

export const reducer = (state: InitialState, { type, payload }: Action) => {
  switch (type) {
    case 'editing':
      return {
        ...state,
        title: 'Editing Task',
        task: payload as Task,
        gql: UPDATE_TASK,
      };

    case 'reset':
      return init(payload as InitialState);
  }
};
