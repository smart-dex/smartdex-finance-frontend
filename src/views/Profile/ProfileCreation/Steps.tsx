import React, { useContext } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import styled from 'styled-components'
import { lightColors, darkColors} from 'style/Color'
import useI18n from 'hooks/useI18n'
import NoWalletConnected from '../components/WalletNotConnected'
import { ProfileCreationContext } from './contexts/ProfileCreationProvider'
import Mint from './Mint'
import ProfilePicture from './ProfilePicture'
import TeamSelection from './TeamSelection'
import UserName from './UserName'




const Loading = styled.div`
  color: ${({ theme }) => (theme.isDark ? darkColors.textSubtle : lightColors.balanceColor)};
  font-size: 14px;
  padding-top: 10px;
`

const Steps = () => {
  const { isInitialized, currentStep } = useContext(ProfileCreationContext)
  const { account } = useWallet()
  const TranslateString = useI18n()

  if (!account) {
    return <NoWalletConnected />
  }

  if (!isInitialized) {
    return <Loading>{TranslateString(3019, 'Loading...')}</Loading>
  }

  if (currentStep === 0) {
    return <Mint />
  }

  if (currentStep === 1) {
    return <ProfilePicture />
  }

  if (currentStep === 2) {
    return <TeamSelection />
  }

  if (currentStep === 3) {
    return <UserName />
  }

  return null
}

export default Steps
