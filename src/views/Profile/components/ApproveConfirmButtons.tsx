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
  font-size: 13px;
  line-height: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  box-shadow: 0px 4px 10px ${brandColors.shadowbtn};
  color: ${({ theme }) => (theme.isDark ? darkColors.colorWap : lightColors.btnApp)};
  background: ${lightColors.colorApprove};
  &:disabled{
    background-color: ${({ theme }) => (theme.isDark ? darkColors.btnApp : lightColors.colorApprove)} !important;
    color: ${({ theme }) => (theme.isDark ? darkColors.colorWap : lightColors.btnApp)} !important;
  }
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
  }
`

const ButtonCon = styled(Button)`
  font-size: 13px;
  line-height: 20px;
  background: ${baseColors.primary};
  box-shadow: none;
  &:disabled{
    background-color: ${({ theme }) => (theme.isDark ? darkColors.btnApp : lightColors.colorApprove)} !important;
    color: ${({ theme }) => (theme.isDark ? darkColors.colorWap : lightColors.btnApp)} !important;
  }
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
  }

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
const FlexBtnPop = styled(Flex)`
  display: flex;
  flex-direction: row;
  grid-gap: 30px;
  justify-content: center;
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
    <FlexBtnPop py="8px" flexDirection={['column', null, 'row']} >
      <ButtonApprove
        disabled={isApproveDisabled}
        onClick={onApprove}
        endIcon={isApproving ? spinnerIcon : undefined}
        isLoading={isApproving}
      >
        {isApproving ? TranslateString(800, 'Approving') : TranslateString(564, 'Approve')}
      </ButtonApprove>
     
      
      <ButtonCon
        onClick={onConfirm}
        disabled={isConfirmDisabled}
        isLoading={isConfirming}
        endIcon={isConfirming ? spinnerIcon : undefined}
      >
        {isConfirming ? TranslateString(802, 'Confirming') : TranslateString(464, 'Confirm')}
      </ButtonCon>
    </FlexBtnPop>
  )
}

export default ApproveConfirmButtons
