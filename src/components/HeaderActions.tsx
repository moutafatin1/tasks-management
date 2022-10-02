import { Button } from ".";

const HeaderActions = () => {
  return (
    <div className="flex items-center justify-between">
      <Button>Add Task</Button>
      <select
        name=""
        id=""
        className="border-none bg-indigo-500 text-slate-50 font-semibold rounded-md cursor-pointer hover:bg-indigo-600 focus:ring-indigo-500"
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
      </select>
    </div>
  );
};

export default HeaderActions;
