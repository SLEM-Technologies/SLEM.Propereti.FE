interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder: string;
  value?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function TextInput(props: TextInputProps) {
  const { label, ...rest } = props;
  return (
    <div>
      {label && <label>{label}</label>}
      <input type="text" {...rest} />
    </div>
  );
}

export default TextInput;
