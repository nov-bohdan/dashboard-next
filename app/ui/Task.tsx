import { State, TaskType } from "@/app/lib/types";
import { useActionState, useState } from "react";
import { deleteTask, updateTaskStatus, updateTaskTitle } from "../lib/actions";
import { startTransition } from "react";
import Spinner from "./Spinner";

const initialState: State = {
  error: "",
  message: "",
};

export default function Task({ task }: { task: TaskType }) {
  const [, action, pending] = useActionState(deleteTask, initialState);
  const [, updateAction, updatePending] = useActionState(
    updateTaskStatus,
    initialState
  );
  const [, updateTitleAction, updateTitlePending] = useActionState(
    updateTaskTitle.bind(null, task.id!),
    initialState
  );
  const [isUpdatingTitle, setIsUpdatingTitle] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setIsUpdatingTitle(false);
    if ((e.target as HTMLFormElement).title.valueOf() === task.title) {
      e.preventDefault();
    }
  };

  return (
    <div className="relative p-6 bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white rounded-xl shadow-xl flex flex-col transition-transform transform hover:scale-105">
      {(pending || updatePending || updateTitlePending) && (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex justify-center items-center rounded-xl">
          <Spinner />
        </div>
      )}
      {isUpdatingTitle ? (
        <form
          className="flex mb-3"
          action={updateTitleAction}
          onSubmit={handleSubmit}
        >
          <input
            defaultValue={task.title}
            type="text"
            name="title"
            className="bg-transparent text-lg font-bold w-full border-2 border-orange-400 outline-none mr-3"
          ></input>
          <button className="text-4xl" type="submit">
            💾
          </button>
        </form>
      ) : (
        <h2 className="text-2xl font-bold mb-3">
          {task.title}{" "}
          <span
            className="text-yellow-400 cursor-pointer"
            onClick={() => setIsUpdatingTitle(!isUpdatingTitle)}
          >
            ✎
          </span>
        </h2>
      )}
      <p>ID: {task.id}</p>
      <p>
        {task.is_completed ? (
          <span className="text-green-400 font-semibold">Completed</span>
        ) : (
          <span className="text-red-400 font-semibold">Not Completed</span>
        )}
      </p>
      <button
        className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm mb-5"
        onClick={() =>
          startTransition(() =>
            updateAction({ id: task.id!, is_completed: !task.is_completed })
          )
        }
      >
        {task.is_completed ? "Mark as Incomplete" : "Mark as Complete"}
      </button>
      <div className="mt-auto self-end">
        <p
          className="cursor-pointer text-red-400 hover:text-red-600 transition-colors"
          onClick={() => startTransition(() => action(task.id!))}
        >
          🗑️
        </p>
      </div>
    </div>
  );
}
