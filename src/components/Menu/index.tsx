import React, { useContext } from 'react'
import { Menu as UikitMenu } from 'smartdex-uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { allLanguages } from 'config/localisation/languageCodes'
import { LanguageContext } from 'contexts/Localisation/languageContext'
import useTheme from 'hooks/useTheme'
import useAuth from 'hooks/useAuth'
import { usePriceSdcBusd, useProfile } from 'state/hooks'
import useI18n from 'hooks/useI18n'

const Menu = (props) => {
  const { account, reset } = useWallet()
  const { login, logout } = useAuth()
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
  const { isDark, toggleTheme } = useTheme()
  const sdcPriceUsd = usePriceSdcBusd()
  const { profile } = useProfile()
  const TranslateString = useI18n()

  const configLinks = [
    {
      label: `${TranslateString(670, 'Home')}`,
      icon: 'HomeIcon',
      href: '/',
    },
    {
      label: `${TranslateString(672, 'Trade')}`,
      icon: 'TradeIcon',
      items: [
        {
          label: `${TranslateString(8, 'Exchange')}`,
          href: `${process.env.REACT_APP_EXCHANGE_URL}/pool#/swap` ,
        },
        {
          label: `${TranslateString(262, 'Liquidity')}`,
          href: `${process.env.REACT_APP_EXCHANGE_URL}/pool#/pool` ,
        },
      ],
    },
    {
      label: `${TranslateString(674, 'Farms')}`,
      icon: 'FarmIcon',
      href: '/farms',
    },
    // {
    //   label: `${TranslateString(676, 'Pools')}`,
    //   icon: 'PoolIcon',
    //   href: '/pools',
    // },
    // {
    //   label: `${TranslateString(14, 'Lottery')}`,
    //   icon: 'TicketIcon',
    //   href: '/lottery',
    // },
    // {
    //   label: `${TranslateString(12215, 'Collectibles')}`,
    //   icon: 'NftIcon',
    //   href: '/collectibles',
    // },
    // {
    //   label: `${TranslateString(12216, 'Teams & Profile')}`,
    //   icon: 'GroupsIcon',
    //   items: [
    //     {
    //       label: `${TranslateString(12217, 'Leaderboard')}`,
    //       href: '/teams',
    //     },
    //     {
    //       label: `${TranslateString(1090, 'Task Center')}`,
    //       href: '/tasks',
    //     },
    //     {
    //       label: `${TranslateString(12218, 'Your Profile')}`,
    //       href: '/profile',
    //     },
    //   ],
    // },
    {
      label: `${TranslateString(680, 'Info')}`,
      icon: 'InfoIcon',
      items: [
        {
          label: `${TranslateString(688, 'Overview')}`,
          href: `${process.env.REACT_APP_INFO_URL}/home`,
        },
        {
          label: `${TranslateString(12223, 'Tokens')}`,
          href: `${process.env.REACT_APP_INFO_URL}/tokens`,
        },
        {
          label: `${TranslateString(692, 'Pairs')}`,
          href: `${process.env.REACT_APP_INFO_URL}/pairs`,
        },
        {
          label: `${TranslateString(694, 'Accounts')}`,
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
      label: `${TranslateString(684, 'More')}`,
      icon: 'MoreIcon',
      items: [
        {
          label: `${TranslateString(12, 'Voting')}`,
          href: '',
        },
        {
          label: 'Github',
          href: process.env.REACT_APP_GIT,
        },
        {
          label: `${TranslateString(10, 'Docs')}`,
          href: process.env.REACT_APP_DOCS_URL,
        },
      ],
    },
  ]

  const linkMyPage = [
    {
      label: "My Page",
      icon: "MyPageIcon",
      items: [
        {
          label: "Wallet",
          href: "/wallet",
        },
        {
          label: "Referral",
          href: "/referral",
        },
        {
          label: "Referral Management",
          href: "/referral-management",
        },
      ],
    },
  ];

  return (
    <UikitMenu
      account={account}
      login={login}
      logout={logout}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={selectedLanguage && selectedLanguage.code}
      langs={allLanguages}
      setLang={setSelectedLanguage}
      cakePriceUsd={sdcPriceUsd.toNumber()}
      links={configLinks}
      linkMyPage={linkMyPage}
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
