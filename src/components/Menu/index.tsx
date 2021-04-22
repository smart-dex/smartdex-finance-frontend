import React, { useContext } from 'react'
import { Menu as UikitMenu } from 'uikit-sotatek'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { allLanguages } from 'config/localisation/languageCodes'
import { LanguageContext } from 'contexts/Localisation/languageContext'
import useTheme from 'hooks/useTheme'
import useAuth from 'hooks/useAuth'
import { usePriceSdcBusd, useProfile } from 'state/hooks'
import useI18n from 'hooks/useI18n'

const Menu = (props) => {
  const { account, reset } = useWallet()
  const { login } = useAuth()
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
  const { isDark, toggleTheme } = useTheme()
  const sdcPriceUsd = usePriceSdcBusd()
  const { profile } = useProfile();
  const TranslateString = useI18n()

  const configLinks = [
    {
      label: `${TranslateString(1090, 'Task Center')}`,
      icon: 'HomeIcon',
      href: '/',
    },
    {
      label: 'Trade',
      icon: 'TradeIcon',
      items: [
        {
          label: 'Exchange',
          href: `${process.env.REACT_APP_EXCHANGE_URL}/pool#/swap` ,
        },
        {
          label: 'Liquidity',
          href: `${process.env.REACT_APP_EXCHANGE_URL}/pool#/pool` ,
        },
      ],
    },
    {
      label: 'Farms',
      icon: 'FarmIcon',
      href: '/farms',
    },
    {
      label: 'Pools',
      icon: 'PoolIcon',
      href: '/pools',
    },
    {
      label: 'Lottery',
      icon: 'TicketIcon',
      href: '/lottery',
    },
    {
      label: 'Collectibles',
      icon: 'NftIcon',
      href: '/collectibles',
    },
    {
      label: 'Teams & Profile',
      icon: 'GroupsIcon',
      items: [
        {
          label: 'Leaderboard',
          href: '/teams',
        },
        {
          label: 'Task Center',
          href: '/tasks',
        },
        {
          label: 'Your Profile',
          href: '/profile',
        },
      ],
    },
    {
      label: 'Info',
      icon: 'InfoIcon',
      items: [
        {
          label: 'Overview',
          href: `${process.env.REACT_APP_INFO_URL}/home`,
        },
        {
          label: 'Tokens',
          href: `${process.env.REACT_APP_INFO_URL}/tokens`,
        },
        {
          label: 'Pairs',
          href: `${process.env.REACT_APP_INFO_URL}/pairs`,
        },
        {
          label: 'Accounts',
          href: `${process.env.REACT_APP_INFO_URL}/accounts`,
        },
      ],
    },
    {
      label: 'IFO',
      icon: 'IfoIcon',
      href: '/ifo',
    },
    {
      label: 'My Page',
      icon: 'MyPageIcon',
      items: [
        {
          label: 'Wallet',
          href: '/wallet',
        },
        {
          label: 'Referral',
          href: '/referral',
        },
        {
          label: 'Refferral Management',
          href: '/refferral-management',
        },
      ],
    },
    {
      label: 'More',
      icon: 'MoreIcon',
      items: [
        {
          label: 'Voting',
          href: '',
        },
        {
          label: 'Github',
          href: '',
        },
        {
          label: 'Docs',
          href: process.env.REACT_APP_DOCS_URL,
        },
        {
          label: 'Blog',
          href: '',
        },
      ],
    },
  ]

  return (
    <UikitMenu
      account={account}
      login={login}
      logout={reset}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={selectedLanguage && selectedLanguage.code}
      langs={allLanguages}
      setLang={setSelectedLanguage}
      cakePriceUsd={sdcPriceUsd.toNumber()}
      links={configLinks}
      profile={{
        username: profile?.username,
        image: profile?.nft ? `/images/nfts/${profile.nft?.images.sm}` : undefined,
        profileLink: '/profile',
        noProfileLink: '/profile',
        showPip: !profile?.username,
      }}
      {...props}
    />
  )
}

export default Menu
