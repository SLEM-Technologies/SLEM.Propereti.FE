import { ChangeEvent } from "react";
import searchIcon from "@/assets/icons/search-icon.svg";
import Icon from "../components/Icon";

interface ISearchInputProps {
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

function SearchInput(props: ISearchInputProps) {
  const { onChange, ...otherProps } = props;
  return (
    <div className="h-[44px] md:h-[64px] flex items-center gap-4 p-3 bg-[#F7F7FD] border-[2px] border-[#E0DEF7] rounded-md">
      <div>
        <Icon src={searchIcon} alt="Search Icon" />
      </div>
      <input
        {...otherProps}
        onChange={onChange}
        className="block w-full h-full focus:outline-none text-primary-50 placeholder:text-primary-50"
      />
    </div>
  );
}

export default SearchInput;
