import { Edit } from './svg/Edit';
import { Trash } from './svg/Trash';

type Props = {
  title: string;
  description: string;
  onClickRemove: () => void;
  onClickEdit: () => void;
};

export const AllTasks = ({ title, description, onClickRemove, onClickEdit }: Props) => {
  return (
    <>
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className='flex items-center justify-end gap-2'>
        <Edit onClick={onClickEdit} />
        <Trash onClick={onClickRemove} />
      </div>
    </>
  );
};
