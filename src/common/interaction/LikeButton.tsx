import { useState } from "react";
import { HiHeart } from "react-icons/hi";
import { HiOutlineHeart } from "react-icons/hi";

const STYLE = { color: "#3A4999", size: 25 };

function LikeButton() {
  const [isLiked, setIsLiked] = useState(false);

  const handleToggleLikeBtn = () => {
    setIsLiked((prev) => !prev);
  };

  return (
    <div
      onClick={handleToggleLikeBtn}
      className="w-[45px] h-[45px] flex justify-center items-center rounded-full border border-[#E8E6F9] cursor-pointer"
    >
      {isLiked ? (
        <HiHeart color={STYLE.color} size={STYLE.size} />
      ) : (
        <HiOutlineHeart color={STYLE.color} size={STYLE.size} />
      )}
    </div>
  );
}

export default LikeButton;
