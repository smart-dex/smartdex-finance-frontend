import React from 'react'
import styled from 'styled-components'
import { Card, Radio } from 'uikit-sotatek'

interface SelectionCardProps {
  name: string
  value: string | number
  isChecked?: boolean
  onChange: (val: any) => void
  image: string
  disabled?: boolean
}

const StyledCardContent = styled(Card)<{ isSuccess: boolean }>`
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
  border: 1px solid #E2E2E8;
  width: 100%;
  position: relative;
`

const Children = styled.div`
  margin-left: 16px;
  ${({ theme }) => theme.mediaQueries.nav} {
    width: 100%;
  }
`

const StyledBackgroundImage = styled.div<{ src: string }>`
  align-self: stretch;
  background-image: url('${({ src }) => src}');
  background-size: cover;
  background-position: right top;
  background-repeat: no-repeat;
  flex: 1 1 auto;
  width: 73px;
  border-radius: 14px !important;
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
    <StyledCardContent className="bbbbbbbbbbbbbbbbbbb" isSuccess={isChecked} isDisabled={disabled} mb="16px" {...props}>
      <LabelText className="aaaaaaaaaaaaaaaaaaaa" isDisabled={disabled}>
        <Body>
          <Radio
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
