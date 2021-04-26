import React from 'react'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import {
  Card,
  CardBody,
  CheckmarkCircleIcon,
  Flex,
  Heading,
  Link,
  Tag,
  Text,
  PrizeIcon,
  OpenNewIcon,
  BlockIcon,
} from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { useProfile } from 'state/hooks'
import { lightColors, darkColors, baseColors, brandColors } from 'style/Color'
import Menu from './components/Menu'
import CardHeader from './components/CardHeader'
import Collectibles from './components/Collectibles'
import WalletNotConnected from './components/WalletNotConnected'
import StatBox from './components/StatBox'
import EditProfileAvatar from './components/EditProfileAvatar'
import AchievementsList from './components/AchievementsList'


const Content = styled.div`
  flex: 1;
  padding: 16px 0 16px 10px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 0 16px;
  }
 
 
`

const Username = styled(Heading)`
  font-size: 16px;
  line-height: 24px;
  
  color: ${brandColors.white};

  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 32px;
    line-height: 44px;
    margin-bottom: 8px;
  }
`

const Status = styled.div`
  position: absolute;
  right: 24px;
  top: 20px;
  ${({ theme }) => theme.mediaQueries.nav} {
    right: 24px;
    top: 24px;
  }
`

const ResponsiveText = styled(Text)`
  font-size: 12px;
  color:${baseColors.colorAddressLink};
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 14px;
    width: auto;
  }
  
`

const AddressLink = styled(Link)`
  display: inline-block;
  font-weight: 400;
  font-size: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 50px;
  white-space: nowrap;
  color: ${baseColors.colorAddressLink};
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 14px;
  }
`
const OpenIcon = styled.div`
  svg{
    fill: ${brandColors.white};
    width: 15px;
    margin-top: 2px;
  }
  ${({ theme }) => theme.mediaQueries.nav} {
    svg{
      fill: ${brandColors.white};
      width: 15px;

    }
  }
`
const TagActive = styled(Tag)`
  border: 1px solid ${brandColors.white};
  font-size: 9px;
  font-weight: 500;
  light-height: 11px;
  color: ${brandColors.white};
  svg{
    fill: ${brandColors.white};
  }

  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 14px;
  }
`
const TagPause = styled(Tag)`
  font-size: 9px;
  font-weight: 500;
  light-height: 11px;
  svg{
    width: 12px;
  }
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 14px;
    svg{
      width: 18px;
    }
  }
`

const BoxPublicCard = styled(CardBody)`
  border: 1px solid ${({ theme }) => (theme.isDark ? darkColors.borderColor : lightColors.borderColor)};
  box-shadow: none;
  border-bottom-right-radius: 40px;
  border-bottom-left-radius: 40px;
`
const CardTeam = styled(Card)`
  box-shadow: none;
  background: none;
  
`

const Section = styled.div`
  margin-bottom: 0px;
  ${({ theme }) => theme.mediaQueries.nav} {
    margin-bottom: 10px;
  }
`
const HeadingAch = styled(Heading)`
  font-size: 14px;
  line-height: 22px;
  font-weight: 700;
  margin-bottom: 0px;
  color: ${({ theme }) => (theme.isDark ? darkColors.balanceColor : lightColors.textMenuLeft)};
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 18px;
  } 
`
const BoxListAchievemnts = styled.div`
    display:flex;
    justify-content: start;
    padding: 7px 0 10px 0;
  h2 {
    font-size: 12px;
    ${({ theme }) => theme.mediaQueries.nav} {
      font-size: 16px !important;
    }
  }
    
`
const FlexProfile = styled(Flex)`
  display: flex;
`
const ListText = styled.div`
  font-weight: bold;
  font-size: 12px;
  line-height: 22px;
  align-item: left;
  color: ${({ theme }) => (theme.isDark ? darkColors.colorWap : lightColors.colorAchievment)};
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px !important;
  }
`
const AccountMobile = styled.span`
  display: block;
  ${({ theme }) => theme.mediaQueries.nav} {
    display:none;
  }
`
const AccountDesktop = styled.span`
  display: none;
  ${({ theme }) => theme.mediaQueries.nav} {
    display: block;
  }
`

const PublicProfile = () => {
  const { account } = useWallet()
  const { profile } = useProfile()
  const TranslateString = useI18n()
  const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null;

  if (!account) {
    return <WalletNotConnected />
  }

  return (
    <>
      <Menu activeIndex={1} />
      <div>
        <CardTeam >
          <CardHeader >
            <FlexProfile alignItems={['start', null, 'center']}>
              <EditProfileAvatar profile={profile} />
              <Content>
                <Username>{`@${profile.username}`}</Username>
                <Flex alignItems="center">
                  <ResponsiveText>
                    <AccountMobile>{accountEllipsis}</AccountMobile>
                    <AccountDesktop>{account}</AccountDesktop>
                  </ResponsiveText>
                    <AddressLink href={`${process.env.REACT_APP_TESTNET_SCAN}/address/${account}`} color="text" external>
                    <OpenIcon><OpenNewIcon ml="4px" /></OpenIcon>
                  </AddressLink>
                  
                </Flex>
                <ResponsiveText bold>{profile.team.name}</ResponsiveText>
              </Content>
            </FlexProfile>
            <Status>
              {profile.isActive ? (
                <TagActive startIcon={<CheckmarkCircleIcon width="18px" />} outline>
                  {TranslateString(698, 'Active')}
                </TagActive>
              ) : (
                <TagPause variant="failure" startIcon={<BlockIcon width="18px" />} outline>
                  {TranslateString(3041, 'Paused')}
                </TagPause>
              )}
            </Status>
          </CardHeader>
          <BoxPublicCard >
            <StatBox icon={PrizeIcon} title={profile.points} subtitle={TranslateString(3042, 'Points')} mb="24px" />
            <Section>
              <HeadingAch as="h4" size="md" mb="16px">
                {TranslateString(1092, 'Team Achievements')}
              </HeadingAch>
              <BoxListAchievemnts>
                  <AchievementsList />
              </BoxListAchievemnts>
              
            </Section>
            <Collectibles />
          </BoxPublicCard>
        </CardTeam>
      </div>
    </>
  )
}

export default PublicProfile
