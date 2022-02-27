import { useMutation } from '@apollo/client';
import { DELETE_TASK } from 'graphql/mutations';
import { GET_TASKS, GET_TASK_REMOVE } from 'graphql/query';
import { Task } from 'graphql/resolvers';
import { useCrud } from 'hooks/useCrud';
import { AllTasks } from './AllTasks';
import { OtherTasks } from './OtherTasks';

export const TaskItems = ({
  data,
  uid,
  state,
}: {
  data: Task[];
  uid: string;
  state: string;
}) => {
  const { changeToEdit } = useCrud();
  const [getMutationRemove] = useMutation(DELETE_TASK, {
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
  return (
    <>
      {data ? (
        <ul>
          {data.map(({ title, description, id }) => (
            <li className='grid grid-cols-2 px-2 py-1 text-sm' key={id}>
              {state === 'All Tasks' ? (
                <AllTasks
                  title={title}
                  description={description}
                  onClickEdit={() => {
                    changeToEdit({
                      description,
                      title,
                      id,
                    });
                  }}
                  onClickRemove={() => {
                    getMutationRemove({
                      variables: {
                        task: {
                          title,
                          description,
                          id,
                        },
                        uid,
                      },
                    });
                  }}
                />
              ) : (
                <OtherTasks title={title} description={description} />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className='grid min-h-full place-items-center'>
          <p>Not login</p>
        </div>
      )}
    </>
  );
};
