type IconButtonProps = {
  children: React.ReactNode;
};

const IconButton = ({ children }: IconButtonProps) => {
  return (
    <button className="bg-gray-200 p-2 rounded-md transition-all hover:bg-gray-300">
      {children}
    </button>
  );
};

export default IconButton;
