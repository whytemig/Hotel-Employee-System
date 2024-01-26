import { useDarkMode } from "../context/DarkmodeContext";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";

function DarkMode() {
  const { isDark, isToggle } = useDarkMode();

  return (
    <ButtonIcon onClick={isToggle}>
      {isDark ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}

export default DarkMode;
