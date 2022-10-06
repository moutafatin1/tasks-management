// src/pages/_app.tsx
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppType } from "next/app";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import "../styles/globals.css";
import { trpc } from "../utils/trpc";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const utils = trpc.useContext();

  const toggleStatus = trpc.tasks.toggleIsCompleted.useMutation({
    async onSuccess() {
      await utils.tasks.all.invalidate();
    },
  });

  return (
    <SessionProvider session={session}>
      <DragDropContext
        onDragEnd={({ draggableId, source, destination }: DropResult) => {
          console.log("🚀 ~ file: _app.tsx ~ line 25 ~ source", source);
          if (!destination) {
            return;
          }
          if (
            source.droppableId === destination.droppableId &&
            destination.index === source.index
          ) {
            return;
          }

          if (destination.droppableId === "Incomplete") {
            toggleStatus.mutateAsync({ id: draggableId, status: true });
          } else {
            toggleStatus.mutateAsync({ id: draggableId, status: false });
          }
        }}
      >
        <Component {...pageProps} />
      </DragDropContext>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
