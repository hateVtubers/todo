import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type Task {
    title: String!
    description: String!
    id: ID!
  }

  input TaskInput {
    title: String
    description: String
    id: ID
  }

  type Mutation {
    createTask(task: TaskInput!, uid: ID!): Task!
    updateTask(task: TaskInput!, id: ID!, uid: ID!): Task!
    deleteTask(task: TaskInput!, uid: ID!): Task!
  }

  type Query {
    getTasks(uid: ID!): [Task]!
    getTasksRemoves(uid: ID!): [Task]!
  }
`;
