import React from "react";

type ButtonProps = {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className="px-6 py-3 bg-indigo-500 text-slate-100 font-bold rounded-md transition-all duration-75  hover:bg-indigo-600 active:scale-95"
    >
      {children}
    </button>
  );
};
