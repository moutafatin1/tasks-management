import React from "react";

type ButtonProps = {
  children: React.ReactNode;
};
export const Button = ({ children }: ButtonProps) => {
  return (
    <button className="px-6 py-3 bg-indigo-500 text-slate-100 font-bold rounded-md transition-all duration-75  hover:bg-indigo-600 active:scale-95">
      {children}
    </button>
  );
};
