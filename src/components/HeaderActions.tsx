import { Button } from ".";

type HeaderActionsProps = {
  setOpenModal: (openModal: boolean) => void;
  openModal: boolean;
};

const HeaderActions = ({ setOpenModal, openModal }: HeaderActionsProps) => {
  return (
    <div className="flex items-center justify-between">
      <Button onClick={() => setOpenModal(!openModal)}>Add Task</Button>
      <select
        name=""
        id=""
        className="border-none py-3 bg-indigo-500 text-slate-50 font-semibold rounded-md cursor-pointer hover:bg-indigo-600 focus:ring-indigo-500"
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
      </select>
    </div>
  );
};

export default HeaderActions;
