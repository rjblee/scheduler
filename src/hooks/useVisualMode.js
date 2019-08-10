import React, { useState } from "react";

export function useVisualMode (targetMode) {
  const [mode, setMode] = useState({currentMode: targetMode})

  return (
    {mode: mode.currentMode}
  )
}