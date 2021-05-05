import React, { useState } from 'react'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useBunnySpecialContract } from 'hooks/useContract'
import { useToast } from 'state/hooks'
import { Button, InjectedModalProps, Modal, Text, Flex } from 'smartdex-uikit'
import { Nft } from 'config/constants/types'
import useI18n from 'hooks/useI18n'
import { darkColors, lightColors, baseColors} from 'style/Color'

interface ClaimNftModalProps extends InjectedModalProps {
  nft: Nft
  onSuccess: () => void
}

const ModalContent = styled.div`
  margin-bottom: 16px;
`
const Actions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 8px;
`

const TextStyle = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? darkColors.text : lightColors.textMenuLeft)};
`

const handleBgDarkMode = (theme)=>(
  theme.isDark ? darkColors.buttonView : lightColors.buttonView
)

const handleColorDarkMode = (theme)=>(
  theme.isDark ? 'rgba(255, 255, 255, 0.6)' : '#8F8FA0'
)

const ButtonConfirm = styled(Button)`
  font-size: 12px;
  padding: 0 12px;
  height: 45px;
  background: ${({ disabled, theme }) => (disabled ? handleBgDarkMode(theme) : baseColors.primary)} !important;
  color: ${({ disabled, theme }) => (disabled ? handleColorDarkMode(theme) : lightColors.invertedContrast)} !important;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
    padding: 0 24px;
    height: 56px;
  }
`

const ButtonCancel = styled(Button)`
  color: ${ baseColors.primary};
  border-color: ${ baseColors.primary};
  font-size: 12px;
  padding: 0 12px;
  height: 45px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
    padding: 0 24px;
    height: 56px;
  }
`

const ClaimNftModal: React.FC<ClaimNftModalProps> = ({ nft, onSuccess, onDismiss }) => {
  const [isConfirming, setIsConfirming] = useState(false)
  const TranslateString = useI18n()
  const { account } = useWallet()
  const { toastError, toastSuccess } = useToast()
  const bunnySpecialContract = useBunnySpecialContract()

  const handleConfirm = async () => {
    bunnySpecialContract.methods
      .mintNFT(nft.bunnyId)
      .send({ from: account })
      .on('sending', () => {     
        setIsConfirming(true)
      })
      .on('receipt', () => {
        toastSuccess('Successfully claimed!')
        onDismiss()
        onSuccess()
      })
      .on('error', (error) => {
        console.error('Unable to claim NFT', error)
        toastError('Error', 'Unable to claim NFT, please try again.')
        setIsConfirming(false)
      })
  }

  return (
    <Modal title={TranslateString(1267, 'Claim Collectible')} onDismiss={onDismiss}>
      <ModalContent>
        <Flex alignItems="center" mb="8px" justifyContent="space-between">
          <TextStyle>{TranslateString(626, 'You will receive')}: </TextStyle>
          <TextStyle bold>{`1x "${nft.name}" Collectible`}</TextStyle>
        </Flex>
      </ModalContent>
      <Actions>
        <ButtonCancel variant="secondary" onClick={onDismiss}>
          {TranslateString(462, 'Cancel')}
        </ButtonCancel>
        <ButtonConfirm onClick={handleConfirm} disabled={!account || isConfirming}>
          {TranslateString(464, 'Confirm')}
        </ButtonConfirm>
      </Actions>
    </Modal>
  )
}

export default ClaimNftModal
