import { Button, TaskList } from "../components";

const AppPage = () => {
  return (
    <main className="h-screen  bg-slate-300">
      {/* Title */}
      <div className="container px-4 mx-auto">
        <h1 className="text-center font-bold  text-6xl p-10">Tasks List</h1>
        {/* Add task / filter actions */}
        <div className="flex items-center justify-between">
          <Button>Add Task</Button>
          <select name="" id="">
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </div>
        {/* Tasks List */}
        <TaskList />
      </div>
    </main>
  );
};

export default AppPage;
