import { MouseEventHandler, ReactNode } from "react";
import { Link, NavLink } from "react-router";
import { useNavigateToTop } from "../hooks/useNavigateToTop";

interface Props {
  children: ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  className?: string | ((isActive: any) => string);
  to: string;
  type: "navlink" | "link";
}

export const LinkToTop = (props: Props) => {
  const navigateToTop = useNavigateToTop();

  const navigateAndReset: MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault();
    navigateToTop(props.to);
  };

  if (props.type === "navlink")
    return (
      <NavLink
        className={props.className}
        onClick={navigateAndReset}
        to={props.to}
      >
        {props.children}
      </NavLink>
    );

  return (
    <Link
      className={props.className as string}
      onClick={navigateAndReset}
      to={props.to}
    >
      {props.children}
    </Link>
  );
};
