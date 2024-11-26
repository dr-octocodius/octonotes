import { useEffect, useCallback, useRef } from "react";

type KeyboardKey = string;
type KeyboardModifier = "ctrl" | "alt" | "shift" | "meta";
type KeyCombination = {
  key: KeyboardKey;
  modifiers?: KeyboardModifier[];
};

interface KeyboardShortcutOptions {
  preventDefault?: boolean;
  stopPropagation?: boolean;
  repeat?: boolean;
  enabled?: boolean;
}

const DEFAULT_OPTIONS: KeyboardShortcutOptions = {
  preventDefault: true,
  stopPropagation: true,
  repeat: false,
  enabled: true,
};

/**
 * Custom hook for handling keyboard shortcuts
 * @param keyCombination - The key combination to listen for
 * @param callback - The callback function to execute when the key combination is pressed
 * @param options - Additional options for the keyboard shortcut
 */
export function useKeyboardShortcut(
  keyCombination: KeyCombination | KeyCombination[],
  callback: (e: KeyboardEvent) => void,
  options: KeyboardShortcutOptions = {}
): void {
  // Merge default options with provided options
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };

  // Use ref for the callback to avoid re-creating the event listener
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  // Convert single key combination to array for consistent handling
  const combinations = Array.isArray(keyCombination)
    ? keyCombination
    : [keyCombination];

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Skip if disabled
      if (!mergedOptions.enabled) return;

      // Skip repeated keydown events unless explicitly enabled
      if (!mergedOptions.repeat && event.repeat) return;

      // Check if any combination matches
      const isMatch = combinations.some((combo) => {
        const modifiers = combo.modifiers || [];
        const keyMatch = event.key.toLowerCase() === combo.key.toLowerCase();

        const modifiersMatch = [
          { key: "ctrl", pressed: event.ctrlKey },
          { key: "alt", pressed: event.altKey },
          { key: "shift", pressed: event.shiftKey },
          { key: "meta", pressed: event.metaKey },
        ].every((mod) => {
          const isRequired = modifiers.includes(mod.key as KeyboardModifier);
          return isRequired === mod.pressed;
        });

        return keyMatch && modifiersMatch;
      });

      if (isMatch) {
        if (mergedOptions.preventDefault) {
          event.preventDefault();
        }
        if (mergedOptions.stopPropagation) {
          event.stopPropagation();
        }
        callbackRef.current(event);
      }
    },
    [combinations, mergedOptions]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);
}
