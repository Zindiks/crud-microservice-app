const styles = {
  black: "\x1b[30m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  reset: "\x1b[0m",

  bold: "\x1b[1m",
  underline: "\x1b[4m",
  blink: "\x1b[5m",
  reverse: "\x1b[7m",
  hidden: "\x1b[8m",
};

export const style = (
  text: string,
  appliedStyles: (keyof typeof styles)[],
): string => {
  const combinedStyles = appliedStyles.map((style) => styles[style]).join("");
  return `${combinedStyles}${text}${styles.reset}`;
};

export const green = (message: string) => {
  return style(message, ["green"]);
};

export const red = (message: string) => {
  return style(message, ["red"]);
};

export const SERVICE_NAME = `${style("[INVENTORY]", ["blue", "bold"])}`;
