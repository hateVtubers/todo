import { useCrud } from 'hooks/useCrud';
import { Button } from 'components/Button';
import { useFieldArray, useForm } from 'react-hook-form';
import { useEffect } from 'react';

export type Inputs = {
  title: string;
  description: string;
};

export const Form = ({
  disabled,
  uid,
}: {
  disabled: boolean;
  uid?: string;
}) => {
  const { changeToDefault, formState, onSubmit } = useCrud(uid);
  const { register, handleSubmit, setValue } = useForm<Inputs>();

  useEffect(() => {
    // @ts-ignore
    if (Object.hasOwn(formState, 'task')) {
      setValue('title', formState.task?.title as string);
      setValue('description', formState.task?.description as string);
    } else {
      setValue('title', '');
      setValue('description', '');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);

  return (
    <form
      className='relative flex flex-col items-center gap-2.5 rounded-md bg-downriver-400 p-3'
      onSubmit={handleSubmit(onSubmit)}
    >
      {formState?.task?.id && (
        <button
          className='absolute top-2 right-2 rounded-full bg-downriver-600 py-0.5 px-2.5'
          onClick={changeToDefault}
        >
          x
        </button>
      )}
      <h1 className='text-xl font-semibold'>{formState.title}</h1>

      <input
        type='text'
        className={`w-full rounded bg-downriver-600 py-1.5 px-3 text-sm outline-none placeholder:text-robin-s-egg-blue-300 ${
          disabled && 'cursor-not-allowed'
        }`}
        placeholder={formState.placeholder.title}
        {...register('title', { required: true, disabled })}
      />
      <textarea
        cols={28}
        rows={10}
        defaultValue={formState?.task?.description ?? ''}
        className={`w-full resize-none rounded bg-downriver-600 py-1.5 px-3 text-sm outline-none placeholder:text-robin-s-egg-blue-300 ${
          disabled && 'cursor-not-allowed'
        }`}
        placeholder={formState.placeholder.description}
        {...register('description', { required: true, disabled })}
      />
      <Button className='px-4 py-1' disabled={disabled}>
        {formState.title.toLowerCase()}
      </Button>
    </form>
  );
};
