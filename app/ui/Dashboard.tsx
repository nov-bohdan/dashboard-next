"use client";

import { Suspense, useState } from "react";
import { DbResponse, State, TaskType } from "../lib/types";
import ModalWrapper from "./ModalWrapper";
import Spinner from "./Spinner";
import TaskList from "./TaskList";

export default function Dashboard({
  responsePromise,
}: {
  responsePromise: Promise<DbResponse<TaskType>>;
}) {
  const [state, setState] = useState<State>({ error: "", message: "" });

  const handleSetState = (newState: State) => {
    setState(newState);
  };
  return (
    <div className="px-4">
      <div className="flex justify-between mb-4 ">
        {state.message && (
          <p className="text-green-400 font-bold bg-green-900 p-3 rounded-lg shadow-xl grow max-w-96 self-center">
            {state.message}
          </p>
        )}
        <ModalWrapper setState={handleSetState} />
      </div>
      <Suspense fallback={<Spinner />}>
        <TaskList responsePromise={responsePromise} />
      </Suspense>
    </div>
  );
}
