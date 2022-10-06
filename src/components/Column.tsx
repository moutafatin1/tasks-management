import { Task } from "@prisma/client";
import { Draggable, Droppable } from "react-beautiful-dnd";

type ColumnProps = {
  title: string;
  tasks: Task[];
};

const Column = ({ title, tasks }: ColumnProps) => {
  return (
    <div className="w-52 bg-indigo-300 flex flex-col p-3 rounded-md mt-5">
      <h2 className="text-center font-bold text-xl p-2 border-b mb-3">
        {title}
      </h2>
      <Droppable droppableId={title}>
        {({ droppableProps, innerRef, placeholder }) => (
          <ul
            className="text-center space-y-2 "
            {...droppableProps}
            ref={innerRef}
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {({ draggableProps, innerRef, dragHandleProps }) => (
                  <li
                    {...dragHandleProps}
                    {...draggableProps}
                    ref={innerRef}
                    className="bg-gray-200 rounded"
                  >
                    {task.body}
                  </li>
                )}
              </Draggable>
            ))}
            {placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
