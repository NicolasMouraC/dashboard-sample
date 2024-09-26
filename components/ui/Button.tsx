import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button(props: ButtonProps) {
  return (
    <button className="bg-blue-500 text-white px-4 py-2 rounded-md" {...props}>
      {props.children}
    </button>
  );
}
