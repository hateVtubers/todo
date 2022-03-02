import { Task } from "graphql/resolvers";
import { useCrud } from "hooks/useCrud";
import { useMenu } from "hooks/useMenu";
import { Loading } from "./Loading";
import { MiniCard } from "./MiniCard";
import { TaskItems } from "./TaskItems";

export const Menu = ({ uid }: { uid: string | undefined }) => {
  const { data, loading, classNames, links } = useMenu({ uid });
  const { formState } = useCrud();
  // console.log(state);
  return (
    <>
      <div className="bg-downriver-400 rounded">
        <nav>
          <ul className="grid w-[369px] grid-cols-2 place-content-center">
            {links.map(([title, onClick]) => (
              <li key={title}>
                <button
                  className={`h-full w-full rounded py-2.5 px-3 text-center font-semibold transition-colors ${
                    classNames === title
                      ? "bg-robin-s-egg-blue-300 text-downriver-500"
                      : "hover:bg-robin-s-egg-blue-300 hover:text-downriver-400"
                  } ${!uid && "cursor-not-allowed"}`}
                  onClick={onClick}
                  disabled={!uid}
                >
                  {title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <main
          className={`h-96 overflow-auto ${
            loading && "grid place-items-center"
          }`}
        >
          {loading ? (
            <Loading width={40} height={40} />
          ) : (
            <TaskItems
              data={
                (data?.getTasks ??
                  data?.getTasksComplete ??
                  data?.getTasksRemoves) as Task[]
              }
              uid={uid as string}
              state={classNames}
            />
          )}
        </main>
      </div>
      <MiniCard uid={uid} id={formState?.task?.id} />
    </>
  );
};
