import React, { useState } from "react";

export function useVisualMode (targetMode) {
  const [mode, setMode] = useState({currentMode: targetMode, previousModes: []})

  function transition (newMode) {
    mode.previousModes.push(mode.currentMode);

    setMode(previousModeObject => ({
      ...previousModeObject,
      currentMode: newMode
    }))
  }

  function back () {
    setMode(previousModeObject => {
      const currentMode = previousModeObject.previousModes.pop();

      return {
      ...previousModeObject,
      currentMode: currentMode
      };
    });
  };

  return (
    {
      mode: mode.currentMode,
      transition: transition,
      back: back
    }
  )
}
