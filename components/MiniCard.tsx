import { CopyToClipboard } from "react-copy-to-clipboard";
import toast from "react-hot-toast";

export const MiniCard = ({
  uid,
  id,
}: {
  uid: string | undefined;
  id: string | undefined;
}) => {
  return (
    <aside className="bg-downriver-400 mt-3 w-full rounded py-1 px-3 text-sm">
      <p>
        uid:{" "}
        <CopyToClipboard
          text={uid as string}
          onCopy={() => toast.success("User ID Copied to clipboard!")}
        >
          <button>{`"${uid}"`}</button>
        </CopyToClipboard>
      </p>
      <p>
        task id:{" "}
        <CopyToClipboard
          text={id as string}
          onCopy={() => toast.success("Task ID Copied to clipboard!")}
        >
          <button>{`"${id}"`}</button>
        </CopyToClipboard>
      </p>
    </aside>
  );
};
