import { gql } from '@apollo/client';

export const GET_TASKS = gql`
  query  ($uid: ID!) {
    getTasks(uid: $uid) {
      title
      description
      done
      id
    }
  }
`;

export const GET_TASK_REMOVE = gql`
  query ($uid: ID!) {
    getTasksRemoves(uid: $uid) {
      title
      description
      done
      id
    }
  }
`;

export const GET_TASK_COMPLETE = gql`
  query ($uid: ID!) {
    getTasksComplete(uid: $uid) {
      title
      description
      done
      id
    }
  }
`;