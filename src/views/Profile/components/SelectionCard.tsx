import React from 'react'
import styled from 'styled-components'
import { Card, Radio } from 'smartdex-uikit'
import { lightColors, darkColors, baseColors } from 'style/Color'

interface SelectionCardProps {
  name: string
  value: string | number
  isChecked?: boolean
  onChange: (val: any) => void
  image: string
  disabled?: boolean
}

const StyledCardContent = styled(Card)<{ isSuccess: boolean }>`
  background-color: ${({ theme }) => (theme.isDark ? darkColors.darkRadio : lightColors.white)}; !important;
  box-shadow: none;
 ${({ isSuccess }) => isSuccess && 'border: 1px solid #0085FF;'}
  border-radius: 16px;
  margin-bottom: 20px;
  display: flex;
  flex direction: column;
  justify-content: space-between;
  position: relative;
`

const LabelText = styled.label<{ isDisabled: boolean }>`
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer')};
  display: flex;
  flex direction: row;
  opacity: ${({ isDisabled }) => (isDisabled ? '0.6' : '1')};
  box-shadow: none;
  width: 100%;
  position: relative;
`

const Body = styled.div`
  align-items: center;
  border-radius: 16px;
  display: flex;
  height: 80px;
  padding: 8px 7px 8px 16px;
  border: 1px solid ${({ theme }) => (theme.isDark ? darkColors.borderColor : lightColors.borderColor)};
  width: 100%;
  position: relative;
  background-color: none !important;
`

const Children = styled.div`
  margin-left: 16px;
  width: 100%;
`

const StyledBackgroundImage = styled.div<{ src: string }>`
  align-self: stretch;
  background-image: url('${({ src }) => src}');
  background-size: cover;
  background-position: right top;
  background-repeat: no-repeat;
  width: 127px;
  border-radius: 14px !important;
  ${({ theme }) => theme.mediaQueries.nav} {
    width: 73px;
  }
  
`
const RadioChecked = styled(Radio)`
  background-color: ${({ theme }) => (theme.isDark ? darkColors.darkRadio : lightColors.lightRadio)};
  border: 1px solid ${({ theme }) => (theme.isDark ? darkColors.darkBorder : lightColors.lightBorder)};
  height: 30px;
  width: 30px;
  :disabled {
    opacity: 1 !important;
  }
`
const SelectionCard: React.FC<SelectionCardProps> = ({
  name,
  value,
  isChecked = false,
  image,
  onChange,
  disabled,
  children,
  ...props
}) => {
  return (
    <StyledCardContent isSuccess={isChecked} isDisabled={disabled} mb="16px" {...props}>
      <LabelText isDisabled={disabled}>
        <Body>
          <RadioChecked
            name={name}
            checked={isChecked}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            style={{ flex: 'none' }}
          />
          <Children>{children}</Children>
          <StyledBackgroundImage src={image} />
        </Body>
        
      </LabelText>
    </StyledCardContent>
  )
}

export default SelectionCard
