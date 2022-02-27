import { db } from 'db/server';
import uniqid from 'uniqid';

export type Task = {
  title: string;
  description: string;
  id?: string;
};

type Params = {
  task: Task;
  uid: string;
  id: string;
};

const getRef = ({ uid, id }: { uid: string; id: string }) => {
  return db.collection(uid).doc(id);
};

export const resolvers = {
  Query: {
    getTasks: async (_: any, { uid }: { uid: string }) => {
      const snapshot = await db.collection(uid).get();

      return snapshot.docs
        .map((doc) => doc.data())
        .filter((task) => !task?.removes);
    },

    getTasksRemoves: async (_: any, { uid }: { uid: string }) => {
      const ref = getRef({ uid: uid, id: 'removes' });
      const doc = await ref.get();

      if (doc.exists) {
        return doc.data()?.removes;
      } else {
        return [];
      }
    },
  },

  Mutation: {
    createTask: async (_: any, { task, uid }: Params) => {
      const id = uniqid(`${task.title}-`);
      await getRef({ uid, id }).set({ ...task, id });

      return { ...task, id };
    },

    updateTask: async (_: any, { task, id, uid }: Params) => {
      await getRef({ uid, id }).update({ ...task });

      return { ...task, id };
    },

    deleteTask: async (_: any, { task, uid }: Params) => {
      const ref = getRef({ uid: uid, id: 'removes' });
      const doc = await ref.get();

      if (doc.exists) {
        await ref.set({ removes: [...doc.data()?.removes, task] });
      } else {
        ref.set({ removes: [task] });
      }

      await getRef({ uid, id: task.id as string }).delete();

      return { ...task };
    },
  },
};
