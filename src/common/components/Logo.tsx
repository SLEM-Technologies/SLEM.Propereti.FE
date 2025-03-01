import { forwardRef } from "react";
import { useNavigate } from "react-router";

interface LogoProps {
  variant?: "primary" | "secondary";
}

const Logo = forwardRef<HTMLDivElement, LogoProps>((props, ref) => {
  const navigate = useNavigate();

  const { variant = "primary", ...rest } = props;
  return (
    <div
      className="flex items-center gap-1 cursor-pointer"
      ref={ref}
      {...rest}
      onClick={() => navigate("/")}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_374_3470)">
          <path
            d="M25.335 11.6137L18.2243 6.08301C17.6003 5.59755 16.8323 5.33398 16.0417 5.33398C15.2511 5.33398 14.483 5.59755 13.859 6.08301L6.747 11.6137C6.31959 11.9461 5.97379 12.3717 5.73601 12.8581C5.49822 13.3446 5.37474 13.8789 5.375 14.4203V24.0203C5.375 24.7276 5.65595 25.4059 6.15605 25.906C6.65615 26.4061 7.33442 26.687 8.04167 26.687H24.0417C24.7489 26.687 25.4272 26.4061 25.9273 25.906C26.4274 25.4059 26.7083 24.7276 26.7083 24.0203V14.4203C26.7083 13.323 26.2017 12.287 25.335 11.6137Z"
            fill="var(--color-primary-50)"
            stroke="var(--color-primary-50)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21.3346 20C18.388 21.7773 13.612 21.7773 10.668 20"
            stroke="#F9FAFB"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_374_3470">
            <rect width="32" height="32" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <span
        className={`text-sm md:text-[1.3rem] leading-[28px] font-[700] ${
          variant === "primary" ? "text-primary-50" : "text-black"
        }`}
      >
        Estatery
      </span>
    </div>
  );
});

Logo.displayName = "Logo";
export default Logo;
