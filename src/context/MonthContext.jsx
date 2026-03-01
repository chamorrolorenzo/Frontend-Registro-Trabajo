import { createContext, useContext, useState } from "react";

const MonthContext = createContext();

export function MonthProvider({ children }) {
  const now = new Date();

  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());

  return (
    <MonthContext.Provider value={{ month, year, setMonth, setYear }}>
      {children}
    </MonthContext.Provider>
  );
}

export function useMonth() {
  return useContext(MonthContext);
}