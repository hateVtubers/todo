import { useFormState } from 'hooks/useFormState';
import { Button } from 'components/Button';

export const Form = ({ disabled, uid }: { disabled: boolean, uid: string }) => {
  const { state, register, handleSubmit } = useFormState(uid);
  return (
    <form
      className='bg-downriver-400 flex flex-col items-center gap-2.5 rounded-md p-3'
      onSubmit={handleSubmit}
    >
      <h1 className='text-xl font-semibold'>{state.title}</h1>

      <input
        type='text'
        className='bg-downriver-600 placeholder:text-robin-s-egg-blue-300 w-full rounded py-1.5 px-3 text-sm outline-none'
        defaultValue={state?.task?.title ?? ''}
        placeholder={state.placeholder.title}
        {...register('title', { required: true, disabled })}
      />
      <textarea
        cols={28}
        rows={10}
        defaultValue={state?.task?.description ?? ''}
        className='bg-downriver-600 placeholder:text-robin-s-egg-blue-300 w-full resize-none rounded py-1.5 px-3 text-sm outline-none'
        placeholder={state.placeholder.description}
        {...register('description', { required: true, disabled })}
      />
      <Button onClick={handleSubmit} className='px-4 py-1' disabled={disabled}>
        {state.title.toLowerCase()}
      </Button>
    </form>
  );
};
