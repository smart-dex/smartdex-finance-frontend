import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Button, Flex, Text, InjectedModalProps } from 'uikit-sotatek'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { getSmartDEXChainProfileAddress } from 'utils/addressHelpers'
import { useSdc } from 'hooks/useContract'
import useI18n from 'hooks/useI18n'
import { useProfile } from 'state/hooks'
import useGetProfileCosts from 'views/Profile/hooks/useGetProfileCosts'
import useHasSdcBalance from 'hooks/useHasSdcBalance'
import { baseColors, lightColors } from 'style/Color'
import { UseEditProfileResponse } from './reducer'
import ProfileAvatar from '../ProfileAvatar'



interface StartPageProps extends InjectedModalProps {
  goToChange: UseEditProfileResponse['goToChange']
  goToRemove: UseEditProfileResponse['goToRemove']
  goToApprove: UseEditProfileResponse['goToApprove']
}

const DangerOutline = styled(Button).attrs({ color: 'secondary', fullWidth: true })`
  border-color: ${({ theme }) => theme.colors.failure};
  color: ${lightColors.white};
  background: ${lightColors.primary};
  margin-bottom: 24px;
  box-shadow: none;
  &:hover:not(:disabled):not(.button--disabled):not(:active) {
    border-color: ${({ theme }) => theme.colors.failure};
    opacity: 0.8;
  }
`
const ButtonChange = styled(Button)`
  background: ${lightColors.primary};
  box-shadow: none;
`
const ButtonReactive = styled(Button)`
  background: ${lightColors.primary};
  box-shadow: none;
`


const StartPage: React.FC<StartPageProps> = ({ goToApprove, goToChange, goToRemove, onDismiss }) => {
  const [needsApproval, setNeedsApproval] = useState(null)
  const { profile } = useProfile()
  const { numberSdcToUpdate, numberSdcToReactivate } = useGetProfileCosts()
  const hasMinimumSdcRequired = useHasSdcBalance(profile.isActive ? numberSdcToUpdate : numberSdcToReactivate)
  const TranslateString = useI18n()
  const { account } = useWallet()
  const sdcContract = useSdc()
  const cost = profile.isActive ? numberSdcToUpdate : numberSdcToReactivate

  /**
   * Check if the wallet has the required SDC allowance to change their profile pic or reactivate
   * If they don't, we send them to the approval screen first
   */
  useEffect(() => {
    const checkApprovalStatus = async () => {
      const response = await sdcContract.methods.allowance(account, getSmartDEXChainProfileAddress()).call()
      const currentAllowance = new BigNumber(response)
      setNeedsApproval(currentAllowance.lt(cost))
    }

    if (account) {
      checkApprovalStatus()
    }
  }, [account, cost, setNeedsApproval, sdcContract])

  if (!profile) {
    return null
  }

  return (
    <Flex alignItems="center" justifyContent="center" flexDirection="column">
      <ProfileAvatar profile={profile} />
      <Flex alignItems="center" style={{ height: '48px' }} justifyContent="center">
        <Text as="p" color="failure">
          {!hasMinimumSdcRequired &&
            TranslateString(999, `${getFullDisplayBalance(numberSdcToUpdate)} SDC required to change profile pic`)}
        </Text>
      </Flex>
      {profile.isActive ? (
        <>
          <ButtonChange
            fullWidth
            mb="8px"
            onClick={needsApproval === true ? goToApprove : goToChange}
            disabled={!hasMinimumSdcRequired || needsApproval === null}
          >
            {TranslateString(3010, 'Change Profile Pic')}
          </ButtonChange>
          <DangerOutline onClick={goToRemove}>{TranslateString(3011, 'Remove Profile Pic')}</DangerOutline>
        </>
      ) : (
        <ButtonReactive
          mb="8px"
          onClick={needsApproval === true ? goToApprove : goToChange}
          disabled={!hasMinimumSdcRequired || needsApproval === null}
        >
          {TranslateString(999, 'Reactivate Profile')}
        </ButtonReactive>
      )}
    </Flex>
  )
}

export default StartPage
