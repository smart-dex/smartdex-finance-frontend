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
  padding: 16px 0;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 0 16px;
  }
`

const Username = styled(Heading)`
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 8px;
  color: ${brandColors.white};

  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 32px;
    line-height: 44px;
  }
`

const Status = styled.div`
  position: absolute;
  right: 24px;
  top: 24px;
  
`

const ResponsiveText = styled(Text)`
  font-size: 12px;
  color:${baseColors.colorAddressLink};
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 14px;
  }
`

const AddressLink = styled(Link)`
  display: inline-block;
  font-weight: 400;
  font-size: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 80px;
  white-space: nowrap;
  color: ${baseColors.colorAddressLink};

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 14px;
    width: auto;
  }
`
const OpenIcon = styled.div`
  svg{
    fill: ${brandColors.white}
  }
`
const TagActive = styled(Tag)`
  border: 1px solid ${brandColors.white};
  color: ${brandColors.white};
  svg{
    fill: ${brandColors.white};
  }
`
const BoxPublicCard = styled(CardBody)`
  border: 1px solid ${({ theme }) => (theme.isDark ? darkColors.borderColor : lightColors.borderColor)};
`

const Section = styled.div`
  margin-bottom: 40px;
`
const HeadingAch = styled(Heading)`
  font-size: 14px;
  line-height: 22px;
  font-weight: 700;
  color: ${({ theme }) => (theme.isDark ? darkColors.balanceColor : lightColors.textMenuLeft)};
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 18px;
  }
`


const PublicProfile = () => {
  const { account } = useWallet()
  const { profile } = useProfile()
  const TranslateString = useI18n()

  if (!account) {
    return <WalletNotConnected />
  }

  return (
    <>
      <Menu activeIndex={1} />
      <div>
        <Card >
          <CardHeader >
            <Flex alignItems={['start', null, 'center']} flexDirection={['column', null, 'row']}>
              <EditProfileAvatar profile={profile} />
              <Content>
                <Username>{`@${profile.username}`}</Username>
                <Flex alignItems="center">
                  <AddressLink href={`https://bscscan.com/address/${account}`} color="text" external>
                    {account}
                  </AddressLink>
                  <OpenIcon><OpenNewIcon ml="4px" /></OpenIcon>
                </Flex>
                <ResponsiveText bold>{profile.team.name}</ResponsiveText>
              </Content>
            </Flex>
            <Status>
              {profile.isActive ? (
                <TagActive startIcon={<CheckmarkCircleIcon width="18px" />} outline>
                  {TranslateString(698, 'Active')}
                </TagActive>
              ) : (
                <Tag variant="failure" startIcon={<BlockIcon width="18px" />} outline>
                  {TranslateString(999, 'Paused')}
                </Tag>
              )}
            </Status>
          </CardHeader>
          <BoxPublicCard className="aaa">
            <StatBox icon={PrizeIcon} title={profile.points} subtitle={TranslateString(999, 'Points')} mb="24px" />
            <Section>
              <HeadingAch as="h4" size="md" mb="16px">
                {TranslateString(1092, 'Team Achievements')}
              </HeadingAch>
              <AchievementsList />
            </Section>
            <Collectibles />
          </BoxPublicCard>
        </Card>
      </div>
    </>
  )
}

export default PublicProfile
