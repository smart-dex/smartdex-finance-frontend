import React from 'react'
import { darkColors, lightColors, baseColors } from 'style/Color'
import styled from 'styled-components'
import { Button, Modal } from 'uikit-sotatek'
import ModalActions from 'components/ModalActions'
import useI18n from 'hooks/useI18n'

const TicketsList = styled.div`
  text-align: left;
  max-height: 400px;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: ${({ theme }) => (theme.isDark ? darkColors.textSubtle : lightColors.textDescriptionMenu)};
`
const ButtonStyle = styled(Button)`
  font-size: 13px;
  padding: 8px;
  background: ${baseColors.primary};
  border-radius: 10px;
  width: 190px;
  border-radius: 9px;
  box-shadow: 0px 4px 10px rgba(64, 170, 255, 0.24);
  &:hover {
    background: #5ba7ec !important;
  }
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
  }
`
const ModalActionsStyle = styled(ModalActions)`
  text-align: center;
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
      <ModalActionsStyle>
        <ButtonStyle onClick={onDismiss}>{TranslateString(476, 'I understand')}</ButtonStyle>
      </ModalActionsStyle>
    </Modal>
  )
}

export default WarningModal
