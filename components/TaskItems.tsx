import { Task } from 'graphql/resolvers';
import { useFormState } from 'hooks/useFormState';
import { Edit } from './svg/Edit';
import { Trash } from './svg/Trash';
import { useMutation } from '@apollo/client';
import { GET_TASKS, GET_TASK_COMPLETE, GET_TASK_REMOVE } from 'graphql/query';
import { DELETE_TASK } from 'graphql/mutations';

export const TaskItems = ({
  data,
  uid,
}: {
  data: Task[] | undefined;
  uid: string;
}) => {
  const [getMutation, { loading }] = useMutation(DELETE_TASK, {
    refetchQueries: [GET_TASKS, GET_TASK_REMOVE, GET_TASK_COMPLETE],
  });
  const { changeToEdit } = useFormState();
  return (
    <ul>
      {data
        ? data.map(({ title, description, done, id }) => (
            <li className='grid grid-cols-2 px-2 py-1 text-sm' key={id}>
              <div>
                <h2>{title}</h2>
                <p>{description}</p>
              </div>
              <div className='flex items-center justify-end gap-2'>
                <Edit
                  onClick={() => changeToEdit({ title, description, done, id })}
                />
                <Trash
                  onClick={() => {
                    getMutation({
                      variables: {
                        task: {
                          title,
                          description,
                          done,
                          id,
                        },
                        uid,
                      },
                    });
                  }}
                />
              </div>
            </li>
          ))
        : 'No data'}
    </ul>
  );
};
