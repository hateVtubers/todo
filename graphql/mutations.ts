import { gql } from '@apollo/client';

export const CREATE_TASK = gql`
  mutation ($task: TaskInput!, $uid: ID!) {
    createTask(task: $task, uid: $uid) {
      id
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation ($task: TaskInput!, $id: ID!, $uid: ID!) {
    updateTask(task: $task, id: $id, uid: $uid) {
      id
    }
  }
`;

export const DELETE_TASK = gql`
  mutation ($task: TaskInput!, $uid: ID!) {
    deleteTask(task: $task, uid: $uid) {
      id
    }
  }
`;
