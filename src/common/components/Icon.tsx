interface IconProps {
  src: string;
  className?: string;
  alt: string;
}

function Icon({ src, className, alt }: IconProps) {
  return <img src={src} className={className} alt={alt} />;
}

export default Icon;
