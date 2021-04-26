import React from 'react'
import { Modal, Flex, Text } from 'uikit-sotatek'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import useI18n from 'hooks/useI18n'
import { useSdc, useSmartDEXChainRabbits, useProfile } from 'hooks/useContract'
import useApproveConfirmTransaction from 'hooks/useApproveConfirmTransaction'
import { fetchProfile } from 'state/profile'
import { useToast } from 'state/hooks'
import styled from 'styled-components'
import { lightColors, darkColors, baseColors} from 'style/Color'
import { REGISTER_COST } from '../ProfileCreation/config'
import ApproveConfirmButtons from './ApproveConfirmButtons'



interface Props {
  userName: string
  tokenId: number
  account: string
  teamId: number
  minimumSdcRequired: BigNumber
  allowance: BigNumber
  onDismiss?: () => void
}

const ModalTitPop = styled(Modal)`
  font-size: 24px;
  line-height: 30px;
  font-weight: 700 !important;
  padding: 30px;

`
const TextPopup = styled(Text)`
    font-weight: 600;
    font-size: 13px;
    line-height: 20px;
    display: flex;
    color: ${({ theme }) => (theme.isDark ? darkColors.balanceColor: lightColors.balanceColor)};
    ${({ theme }) => theme.mediaQueries.nav} {
      font-size: 14px;
    }
`
const TextStyle = styled(Text)`
    color: ${({ theme }) => (theme.isDark ? darkColors.balanceColor: lightColors.balanceColor)} !important;
    font-weight: 600;
    font-size: 13px;
    line-height: 20px;
    ${({ theme }) => theme.mediaQueries.nav} {
      font-size: 14px;
    }
`
const TextNum = styled(Text)`
    font-size: 13px;
    line-height: 20px;
    font-weight: 600;
    color: ${({ theme }) => (theme.isDark ? darkColors.balanceColor: lightColors.balanceColor)};
    margin-left: 5px;
    ${({ theme }) => theme.mediaQueries.nav} {
      font-size: 14px;
    }

`
const BoxContent = styled.div`
${({ theme }) => theme.mediaQueries.nav} {
  width: 450px;
  height: 185px;
  
`
const BtnAll = styled(ApproveConfirmButtons)`
  display: grid ;
  flex-direction: row;
  grid-gap: 30px;
  justify-content: center;
`

const ConfirmProfileCreationModal: React.FC<Props> = ({
  account,
  teamId,
  tokenId,
  minimumSdcRequired,
  allowance,
  onDismiss,
}) => {
  const TranslateString = useI18n()
  const profileContract = useProfile()
  const smartDEXChainRabbitsContract = useSmartDEXChainRabbits()
  const dispatch = useDispatch()
  const { toastSuccess } = useToast()
  const sdcContract = useSdc()

  const {
    isApproving,
    isApproved,
    isConfirmed,
    isConfirming,
    handleApprove,
    handleConfirm,
  } = useApproveConfirmTransaction({
    onRequiresApproval: async () => {
      try {
        const response = await sdcContract.methods.allowance(account, profileContract.options.address).call()
        const currentAllowance = new BigNumber(response)
        return currentAllowance.gte(minimumSdcRequired)
      } catch (error) {
        return false
      }
    },
    onApprove: () => {
      return sdcContract.methods.approve(profileContract.options.address, allowance.toJSON()).send({ from: account })
    },
    onConfirm: () => {
      return profileContract.methods
        .createProfile(teamId, smartDEXChainRabbitsContract.options.address, tokenId)
        .send({ from: account })
    },
    onSuccess: async () => {
      await dispatch(fetchProfile(account))
      onDismiss()
      toastSuccess(`${TranslateString(3049,'Profile created!')}`)
    },
  })

  return (
    <ModalTitPop title={TranslateString(3000, 'Complete Profile')} onDismiss={onDismiss}>
      <BoxContent>
          <TextPopup color="textSubtle" mb="8px">
            {TranslateString(3003, 'Submitting NFT to contract and confirming User Name and Team')}
          </TextPopup>
          <Flex  mb="16px">
            <TextStyle>{TranslateString(3004, 'Cost: ')}</TextStyle>
            <TextNum>{TranslateString(999, `${REGISTER_COST} SDC`, { num: REGISTER_COST })}</TextNum>
          </Flex>
          <BtnAll
            isApproveDisabled={isConfirmed || isConfirming || isApproved}
            isApproving={isApproving}
            isConfirmDisabled={!isApproved || isConfirmed}
            isConfirming={isConfirming}
            onApprove={handleApprove}
            onConfirm={handleConfirm}
          />
      </BoxContent>
    </ModalTitPop>
  )
}

export default ConfirmProfileCreationModal
