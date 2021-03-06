import React, { useState, useEffect } from 'react'
import { TranslationsContext } from 'contexts/Localisation/translationsContext'
import { allLanguages, EN } from 'config/localisation/languageCodes'
import {listLanguage} from '../../locales/index'

const CACHE_KEY = 'pancakeSwapLanguage'

export interface LangType {
  code: string
  language: string
}

export interface LanguageState {
  selectedLanguage: LangType
  setSelectedLanguage: (langObject: LangType) => void
  translatedLanguage: LangType
  setTranslatedLanguage: React.Dispatch<React.SetStateAction<LangType>>
}

const LanguageContext = React.createContext({
  selectedLanguage: EN,
  setSelectedLanguage: () => undefined,
  translatedLanguage: EN,
  setTranslatedLanguage: () => undefined,
} as LanguageState)

const LanguageContextProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<any>(EN)
  const [translatedLanguage, setTranslatedLanguage] = useState<any>(EN)
  const [translations, setTranslations] = useState<Array<any>>([])
  const getStoredLang = (storedLangCode: string) => {
    return allLanguages.filter((language) => {
      return language.code === storedLangCode
    })[0]
  }
  useEffect(() => {
    const storedLangCode = localStorage.getItem(CACHE_KEY)
    if (storedLangCode) {
      const storedLang = getStoredLang(storedLangCode)
      setSelectedLanguage(storedLang)
    } else {
      setSelectedLanguage(EN)
    }
    

  }, [])

  useEffect(() => {
    let translationData = []
    if (selectedLanguage) {
      listLanguage.map((item)=>{
        if (item.language === selectedLanguage.code){
          translationData = item.data
        }
        return setTranslations(translationData)
      })   
    }
  }, [selectedLanguage, setTranslations])

  const handleLanguageSelect = (langObject: LangType) => {
    setSelectedLanguage(langObject)
    localStorage.setItem(CACHE_KEY, langObject.code)

    const iframe=document.getElementById("iframe-x-exchange")
    if (iframe instanceof HTMLIFrameElement){
      const win = iframe.contentWindow
      win.postMessage({key: CACHE_KEY, value: langObject.code},"*")
    }
  }

  return (
    <LanguageContext.Provider
      value={{ selectedLanguage, setSelectedLanguage: handleLanguageSelect, translatedLanguage, setTranslatedLanguage }}
    >
      <TranslationsContext.Provider value={{ translations, setTranslations }}>{children}</TranslationsContext.Provider>
    </LanguageContext.Provider>
  )
}

export { LanguageContext, LanguageContextProvider }
