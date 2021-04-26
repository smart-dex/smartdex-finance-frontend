import React, { useState } from 'react'
import styled from 'styled-components'
import Web3 from 'web3'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Button, Input, Modal, Text } from 'uikit-sotatek'
import { useToast } from 'state/hooks'
import { Nft } from 'config/constants/types'
import useI18n from 'hooks/useI18n'
import { useSmartDEXChainRabbits } from 'hooks/useContract'
import { darkColors, lightColors, baseColors } from 'style/Color'
import InfoRow from './InfoRow'

interface TransferNftModalProps {
  nft: Nft
  tokenIds: number[]
  onSuccess: () => any
  onDismiss?: () => void
}

const Value = styled(Text)`
  font-weight: 600;
  color: ${({ theme }) => (theme.isDark ? darkColors.text : lightColors.textMenuLeft)};
`

const ModalContent = styled.div`
  margin-bottom: 16px;
`

const Actions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 8px;
`

const Label = styled.label`
  color: ${({ theme }) => (theme.isDark ? darkColors.text : lightColors.textMenuLeft)};
  display: block;
  margin-bottom: 8px;
  margin-top: 24px;
`

const TextStyle = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? darkColors.text : lightColors.textMenuLeft)};
`
const TextErrorStyle = styled(Text)`
  color: red;
`

const InputStyle = styled(Input)`
  background: ${({ theme }) => (theme.isDark ? darkColors.background : lightColors.backgroundCover)};
  color: ${({ theme }) => (theme.isDark ? darkColors.text : lightColors.textMenuLeft)};
  box-shadow: none;
  &:focus:not(:disabled) {
    box-shadow: none;
  }
  ::placeholder {
    color: ${({ theme }) => (theme.isDark ? darkColors.colorInput : lightColors.colorInput)};
  }
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


const TransferNftModal: React.FC<TransferNftModalProps> = ({ nft, tokenIds, onSuccess, onDismiss }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [value, setValue] = useState('')
  const [error, setError] = useState(null)
  const TranslateString = useI18n()
  const { account } = useWallet()
  const smartDEXChainRabbitsContract = useSmartDEXChainRabbits()
  const { toastSuccess } = useToast()

  const handleConfirm = async () => {
    try {
      const isValidAddress = Web3.utils.isAddress(value)

      if (!isValidAddress) {
        setError(TranslateString(1262, 'Please enter a valid wallet address'))
      } else if (value === account) {
        setError(TranslateString(1263, 'You cannot transfer to your address'))
      } else {
        await smartDEXChainRabbitsContract.methods
          .transferFrom(account, value, tokenIds[0])
          .send({ from: account })
          .on('sending', () => {
            setIsLoading(true)
          })
          .on('receipt', () => {
            onDismiss()
            onSuccess()
            toastSuccess(TranslateString(1264, 'NFT successfully transferred!'))
          })
          .on('error', () => {
            console.error(error)
            setError(TranslateString(3050,'Unable to transfer NFT'))
            setIsLoading(false)
          })
      }
    } catch (err) {
      console.error('Unable to transfer NFT:', err)
    }
  }

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = evt.target
    setValue(inputValue)
  }

  return (
    <Modal title={TranslateString(1259, 'Transfer NFT')} onDismiss={onDismiss}>
      <ModalContent>
        <InfoRow>
          <TextStyle>{TranslateString(1260, 'Transferring')}:</TextStyle>
          <Value>{`1x "${nft.name}" NFT`}</Value>
        </InfoRow>
        <Label htmlFor="transferAddress">{TranslateString(1261, 'Receiving address')}:</Label>
        <InputStyle
          id="transferAddress"
          name="address"
          type="text"
          placeholder={TranslateString(3018, 'Paste address')}
          value={value}
          onChange={handleChange}
          isWarning={error}
          disabled={isLoading}
        />
      </ModalContent>
      {error && (
          <TextErrorStyle color="failure" mb="8px">
            {error}
          </TextErrorStyle>
        )}
      <Actions>
        <ButtonCancel variant="secondary" onClick={onDismiss}>
          {TranslateString(462, 'Cancel')}
        </ButtonCancel>
        <ButtonConfirm onClick={handleConfirm} disabled={!account || isLoading || !value}>
          {TranslateString(464, 'Confirm')}
        </ButtonConfirm>
      </Actions>
    </Modal>
  )
}

export default TransferNftModal
