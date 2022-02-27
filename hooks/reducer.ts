import { UPDATE_TASK, DELETE_TASK } from 'graphql/mutations';
import { Task } from 'graphql/resolvers';
import { DocumentNode } from 'graphql';

type InitialState = {
  title: string;
  placeholder: {
    title: string;
    description: string;
  };
  mutation: DocumentNode;
};

type Action = {
  type: 'editing' | 'reset';
  payload?: Task | InitialState | DocumentNode;
};

export const init = (initialState: InitialState) => ({ ...initialState });

export const reducer = (state: InitialState, { type, payload }: Action) => {
  switch (type) {
    case 'editing':
      return {
        ...state,
        title: 'Editing Task',
        task: payload as Task,
        mutation: UPDATE_TASK,
      };

    case 'reset':
      return init(payload as InitialState);
  }
};
