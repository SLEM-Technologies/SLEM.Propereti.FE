import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

function PrimaryButton({ children, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(
        `flex justify-center items-center rounded-md text-white cursor-pointer ${
          className || "w-full px-4 py-2 bg-primary-50"
        }`
      )}
    >
      {children}
    </button>
  );
}

export { PrimaryButton };
