import React, { useContext } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import styled from 'styled-components'
import { lightColors, darkColors} from 'style/Color'
import NoWalletConnected from '../components/WalletNotConnected'
import { ProfileCreationContext } from './contexts/ProfileCreationProvider'
import Mint from './Mint'
import ProfilePicture from './ProfilePicture'
import TeamSelection from './TeamSelection'
import UserName from './UserName'



const Loading = styled.div`
  color: ${({ theme }) => (theme.isDark ? darkColors.textSubtle : lightColors.balanceColor)};
`

const Steps = () => {
  const { isInitialized, currentStep } = useContext(ProfileCreationContext)
  const { account } = useWallet()

  if (!account) {
    return <NoWalletConnected />
  }

  if (!isInitialized) {
    return <Loading>Loading...</Loading>
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
