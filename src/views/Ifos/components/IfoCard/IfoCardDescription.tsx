import React, { useState } from 'react'
import styled from 'styled-components'
import { Text } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'

export interface IfoCardDescriptionProps {
  defaultIsOpen?: boolean
  description: string
}

const StyledIfoCardDescription = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
`

const ToggleButton = styled.button`
  background: transparent;
  border: none;
  color: #0085ff;
  cursor: pointer;
  display: block;
  font-weight: 700;
  font-size: 13px;
  line-height: 16px;
  outline: 0;
  padding: 0;
  margin-bottom: 10px;
  width: 100%;
  text-align: left;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 16px;
    line-height: 20px;
  }
`

const Description = styled(Text)<{ isOpen: boolean }>`
  color: rgba(95, 94, 118, 0.7);
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
`

const IfoCardDescription: React.FC<IfoCardDescriptionProps> = ({ defaultIsOpen = true, description }) => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen)
  const TranslateString = useI18n()

  const handleClick = () => setIsOpen(!isOpen)

  return (
    <StyledIfoCardDescription>
      <ToggleButton onClick={handleClick}>
        {isOpen ? TranslateString(1066, 'Hide') : TranslateString(1064, 'Show')}
      </ToggleButton>
      <Description isOpen={isOpen}>{description}</Description>
    </StyledIfoCardDescription>
  )
}

export default IfoCardDescription
