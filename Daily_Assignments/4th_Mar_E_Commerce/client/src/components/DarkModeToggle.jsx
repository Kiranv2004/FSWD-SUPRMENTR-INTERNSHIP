import { FaMoon, FaSun } from "react-icons/fa";
import { useApp } from "../context/AppContext.jsx";

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useApp();

  return (
    <button
      type="button"
      onClick={toggleDarkMode}
      className="rounded-full p-2 text-slate-700 transition hover:bg-slate-200 dark:text-slate-200 dark:hover:bg-slate-700"
      aria-label="Toggle dark mode"
    >
      {darkMode ? <FaSun /> : <FaMoon />}
    </button>
  );
};

export default DarkModeToggle;
