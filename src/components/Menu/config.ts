import { MenuEntry } from 'smartdex-uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    items: [
      {
        label: 'Exchange',
        href: `${process.env.REACT_APP_EXCHANGE_URL}/#/swap` ,
      },
      {
        label: 'Liquidity',
        href: `${process.env.REACT_APP_EXCHANGE_URL}/#/pool` ,
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

export default config
