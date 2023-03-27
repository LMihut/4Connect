import React, { useContext } from "react";
import Switch from "react-switch";
import { ThemeContext } from "styled-components";
import { shade } from "polished";

interface ThemeSwitching {
  toggleTheme(): void;
}

const Settings: React.FC<ThemeSwitching> = ({ toggleTheme }) => {
  const { colors, title } = useContext(ThemeContext);
  return (
    <Switch
      onChange={toggleTheme}
      checked={title === "dark"}
      checkedIcon={false}
      uncheckedIcon={false}
      height={10}
      width={40}
      handleDiameter={20}
      offColor={shade(0.3, colors.primary)}
      onColor={colors.secondaryFontColor}
    />
  );
};

export default Settings;
