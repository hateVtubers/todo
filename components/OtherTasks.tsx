type Props = {
  title: string;
  description: string;
};

export const OtherTasks = ({ title, description }: Props) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};
