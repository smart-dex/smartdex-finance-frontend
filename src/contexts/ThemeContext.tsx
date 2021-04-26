import React, { useState } from 'react'
import { ThemeProvider as SCThemeProvider } from 'styled-components'
import { light, dark } from '@pancakeswap-libs/uikit'

const CACHE_KEY = 'IS_DARK'

const ThemeContext = React.createContext({ isDark: null, toggleTheme: () => null })

const ThemeContextProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const isDarkUserSetting = localStorage.getItem(CACHE_KEY)
    return isDarkUserSetting ? JSON.parse(isDarkUserSetting) : false
  })            

  const toggleTheme = () => {
    setIsDark((prevState: any) => {
      localStorage.setItem(CACHE_KEY, JSON.stringify(!prevState))

      const iframE=document.getElementById("iframe-x-exchange")
      if (iframE instanceof HTMLIFrameElement){
        const win = iframE.contentWindow;
        win.postMessage({key: CACHE_KEY, value: JSON.stringify(!prevState)},"*")
      }

      const iframeI=document.getElementById("iframe-x-info")
      if (iframeI instanceof HTMLIFrameElement){
        const win = iframeI.contentWindow;
        win.postMessage({action: "update", item: 'UNISWAP',key: "DARK_MODE", value: JSON.stringify(!prevState)},"*")
      }

      return !prevState
    })
  }



  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <SCThemeProvider theme={isDark ? dark : light}>{children}</SCThemeProvider>
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeContextProvider }
