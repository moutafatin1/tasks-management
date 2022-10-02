type TaskProps = {
  children: React.ReactNode;
};

export const Task = ({ children }: TaskProps) => {
  return (
    <li className="bg-white p-4 rounded-md">
      <div className="flex items-center space-x-2">
        <input type="checkbox" className="" />
        <div className="flex flex-col">
          <span className="font-semibold">{children}</span>
          <span className="text-sm">8:28 AM, 10/02/2022</span>
        </div>
      </div>
    </li>
  );
};
