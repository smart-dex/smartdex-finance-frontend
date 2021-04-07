import React from 'react'
import styled from 'styled-components'
import { ChevronRightIcon, Button as UIKitButton, Flex, AutoRenewIcon, ChevronDownIcon } from 'uikit-sotatek'
import useI18n from 'hooks/useI18n'
import { lightColors, darkColors, brandColors, baseColors } from 'style/Color'


interface ApproveConfirmButtonsProps {
  isApproveDisabled: boolean
  isApproving: boolean
  isConfirming: boolean
  isConfirmDisabled: boolean
  onApprove: () => void
  onConfirm: () => void
}

const Button = styled(UIKitButton)`
  width: 100%;

  ${({ theme }) => theme.mediaQueries.md} {
    min-width: 160px;
    width: auto;
  }
`
const ButtonApprove = styled(Button)`
  font-size: 16px;
  line-height: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  box-shadow: 0px 4px 10px ${brandColors.shadowbtn};
  color: ${({ theme }) => (theme.isDark ? darkColors.colorWap : lightColors.btnApp)};
  background: ${lightColors.colorApprove};
`

const ButtonCon = styled(Button)`
  background: ${baseColors.primary};

`
const iconAttrs = { width: '24px', color: 'textDisabled' }

const ChevronRight = styled(ChevronRightIcon).attrs(iconAttrs)`
  display: none;

  ${({ theme }) => theme.mediaQueries.md} {
    display: block;
  }
`

const ChevronBottom = styled(ChevronDownIcon).attrs(iconAttrs)`
  display: block;

  ${({ theme }) => theme.mediaQueries.md} {
    display: none;
  }
`

const spinnerIcon = <AutoRenewIcon spin color="currentColor" />

const ApproveConfirmButtons: React.FC<ApproveConfirmButtonsProps> = ({
  isApproveDisabled,
  isApproving,
  isConfirming,
  isConfirmDisabled,
  onApprove,
  onConfirm,
}) => {
  const TranslateString = useI18n()

  return (
    <Flex py="8px" flexDirection={['column', null, 'row']} alignItems="center">
      <ButtonApprove
        disabled={isApproveDisabled}
        onClick={onApprove}
        endIcon={isApproving ? spinnerIcon : undefined}
        isLoading={isApproving}
      >
        {isApproving ? TranslateString(800, 'Approving') : TranslateString(564, 'Approve')}
      </ButtonApprove>
      <ChevronRight />
      <ChevronBottom />
      <ButtonCon
        onClick={onConfirm}
        disabled={isConfirmDisabled}
        isLoading={isConfirming}
        endIcon={isConfirming ? spinnerIcon : undefined}
      >
        {isConfirming ? TranslateString(802, 'Confirming') : TranslateString(464, 'Confirm')}
      </ButtonCon>
    </Flex>
  )
}

export default ApproveConfirmButtons
