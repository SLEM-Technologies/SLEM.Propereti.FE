import React from "react";

interface TextAreaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  className?: string;
  cols?: number;
  rows?: number;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  children?: React.ReactNode;
}

function TextArea(props: TextAreaProps) {
  const { label, cols, rows, children, ...rest } = props;
  return (
    <div>
      {label && <label>{label}</label>}
      <textarea cols={cols} rows={rows} {...rest}>
        {children}
      </textarea>
    </div>
  );
}

export default TextArea;
