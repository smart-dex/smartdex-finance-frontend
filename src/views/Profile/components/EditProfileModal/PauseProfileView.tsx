import React, { useState } from 'react'
import { AutoRenewIcon, Button, Checkbox, Flex, InjectedModalProps, Text } from 'uikit-sotatek'
import useI18n from 'hooks/useI18n'
import { useDispatch } from 'react-redux'
import { useProfile, useToast } from 'state/hooks'
import { fetchProfile } from 'state/profile'
import useGetProfileCosts from 'views/Profile/hooks/useGetProfileCosts'
import { getBalanceNumber } from 'utils/formatBalance'
import { useProfile as useProfileContract } from 'hooks/useContract'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import styled from 'styled-components'
import { darkColors, lightColors, baseColors } from 'style/Color'

type PauseProfilePageProps = InjectedModalProps

const PauseProfilePage: React.FC<PauseProfilePageProps> = ({ onDismiss }) => {
  const [isAcknowledged, setIsAcknowledged] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const { profile } = useProfile()
  const { numberSdcToReactivate } = useGetProfileCosts()
  const TranslateString = useI18n()
  const smartDEXChainProfileContract = useProfileContract()
  const { account } = useWallet()
  const { toastSuccess, toastError } = useToast()
  const dispatch = useDispatch()

  const handleChange = () => setIsAcknowledged(!isAcknowledged)

  const handleDeactivateProfile = () => {
    smartDEXChainProfileContract.methods
      .pauseProfile()
      .send({ from: account })
      .on('sending', () => {
        setIsConfirming(true)
      })
      .on('receipt', async () => {
        // Re-fetch profile
        await dispatch(fetchProfile(account))
        toastSuccess(`${TranslateString(3031,"Profile Paused!")}`) 
        onDismiss()
      })
      .on('error', (error) => {
        toastError(TranslateString(3051,'An error occurred confirming transaction'))
        setIsConfirming(false)
      })
  }

  if (!profile) {
    return null
  }

  return (
    <>
      <TextWarning as="p" color="failure" mb="24px">
        {TranslateString(3015, 'This will suspend your profile and send your Collectible back to your wallet')}
      </TextWarning>
      <TextSupport as="p" color="textSubtle" mb="24px">
        {TranslateString(
          3016,
          "While your profile is suspended, you won't be able to earn points, but your achievements and points will stay associated with your profile",
        )}
      </TextSupport>
      <TextSupport as="p" color="textSubtle" mb="24px">
        {`${TranslateString(3027, "Cost to reactivate in future:")} ${getBalanceNumber(numberSdcToReactivate)} SDC`}
      </TextSupport>
      <label htmlFor="acknowledgement" style={{ cursor: 'pointer', display: 'block', marginBottom: '24px' }}>
        <FlexCheck alignItems="center">
          <Checkbox id="acknowledgement" checked={isAcknowledged} onChange={handleChange} scale="sm" />
          <TextCheck ml="8px">{TranslateString(3017, 'I understand')}</TextCheck>
        </FlexCheck>
      </label>
      <ConfirmBtn
        isLoading={isConfirming}
        endIcon={isConfirming ? <AutoRenewIcon spin color="currentColor" /> : null}
        disabled={!isAcknowledged || isConfirming}
        onClick={handleDeactivateProfile}
        mb="8px"
      >
        {TranslateString(3048, 'Confirm')}
      </ConfirmBtn>
    </>
  )
}

const TextWarning = styled(Text)`
  color: ${lightColors.colorRed};
  font-weight: 500;
  font-size: 13px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 14px;
  }
`
const TextSupport = styled(Text)`
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    display: flex;
    color: ${({ theme }) => (theme.isDark ? darkColors.balanceColor: lightColors.balanceColor)};

`
const FlexCheck = styled(Flex)`
  box-shadow: none !important;
  position: relative;
  & : checked {
    background-color: ${baseColors.bgrChecked}!important;
  }
  & : hover{
   box-shadow: none !important;
  }
  & :focus{
    box-shadow: none !important;
  }
  & < div : active{
    box-shadow: none !important;
    border: 1px solid ${({ theme }) => (theme.isDark ? darkColors.borderColor : lightColors.borderColor)};
  }              
`
const TextCheck = styled(Text)`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => (theme.isDark ? darkColors.balanceColor: lightColors.balanceColor)};
`
const ConfirmBtn = styled(Button)`
    box-shadow: none !important;
    color: ${lightColors.white} !imporatant;
    background : ${baseColors.primary};
    &:disabled{
      background-color: ${({ theme }) => (theme.isDark ? darkColors.btnApp : lightColors.colorApprove)} !important;
      color: ${({ theme }) => (theme.isDark ? darkColors.colorWap : lightColors.btnApp)} !important;
    } 
`


export default PauseProfilePage
