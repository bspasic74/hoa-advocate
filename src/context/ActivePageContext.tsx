'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type ActivePageContextType = {
  activePage: string
  setActivePage: (page: string) => void
}

const ActivePageContext = createContext<ActivePageContextType | undefined>(undefined)

export function ActivePageProvider({ children }: { children: ReactNode }) {
  const [activePage, setActivePage] = useState("HOA Advocate")

  return (
    <ActivePageContext.Provider value={{ activePage, setActivePage }}>
      {children}
    </ActivePageContext.Provider>
  )
}

export function useActivePage() {
  const context = useContext(ActivePageContext)
  if (!context) {
    throw new Error("useActivePage must be used within an ActivePageProvider")
  }
  return context
}