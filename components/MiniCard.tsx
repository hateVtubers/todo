export const MiniCard = ({
  uid,
  id,
}: {
  uid: string | null;
  id: string | undefined | null;
}) => {
  return (
    <aside className='bg-downriver-400 mt-3 w-full rounded py-1 px-3 text-sm'>
      <p>uid: {`"${uid}"`}</p>
      <p>task id: {`"${id}"`}</p>
    </aside>
  );
};
