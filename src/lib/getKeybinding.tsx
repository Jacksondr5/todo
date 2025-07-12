import { keybindings } from "~/components/help/KeybindingsHelp";

type KeybindingValues = (typeof keybindings)[keyof typeof keybindings];

export const getKeybinding = (
  e: React.KeyboardEvent<HTMLInputElement>,
): KeybindingValues | undefined => {
  let keybinding = "";
  if (e.ctrlKey) {
    keybinding += "Ctrl+";
  }
  if (e.shiftKey) {
    keybinding += "Shift+";
  }
  keybinding += e.key;

  // Check if the key matches any defined keybinding
  const matchingKeybinding = Object.entries(keybindings).find(
    ([_, value]) => value === keybinding,
  );

  return matchingKeybinding ? matchingKeybinding[1] : undefined;
};
