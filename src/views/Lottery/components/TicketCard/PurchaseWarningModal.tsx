import React from 'react'
import { Button, Modal } from 'uikit-sotatek'
import ModalActions from 'components/ModalActions'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import { darkColors, lightColors, baseColors } from '../../../../style/Color'

const ButtonStyle = styled(Button)`
  font-size: 13px;
  padding: 8px;
  background: ${baseColors.primary};
  border-radius: 10px;
  width: 100%;
  &:hover {
    background: #5ba7ec !important;
  }
  ${({ theme }) => theme.mediaQueries.nav} {
  font-size: 16px;
  }
`

const WarningModal: React.FC<{ onDismiss?: () => void }> = ({ onDismiss }) => {
  const TranslateString = useI18n()

  return (
    <Modal title={TranslateString(466, 'Warning')} onDismiss={onDismiss}>
      <TicketsList>
        {TranslateString(468, 'Lottery ticket purchases are final.')}
        <br />
        {TranslateString(470, 'Your CAKE will not be returned to you after you spend it to buy tickets.')}
        <br />
        {TranslateString(472, 'Tickets are only valid for one lottery draw, and will be burned after the draw.')}
        <br />
        {TranslateString(
          474,
          'Buying tickets does not guarantee you will win anything. Please only participate once you understand the risks.',
        )}
      </TicketsList>
      <ModalActions>
        <ButtonStyle  onClick={onDismiss}>
          {TranslateString(476, 'I understand')}
        </ButtonStyle>
      </ModalActions>
    </Modal>
  )
}

const TicketsList = styled.div`
  text-align: left;
  max-height: 400px;
  color: ${({ theme }) => theme.isDark ?  darkColors.text : lightColors.textMenuLeft };
`

export default WarningModal
