import React from 'react'
import { lightColors, darkColors } from 'style/Color'
import styled, { css } from 'styled-components'

interface LabelProps {
  text?: string
  isFinished?: boolean
  colorLabel?: string
}

const Label: React.FC<LabelProps> = ({ text, isFinished = false, colorLabel }) => (
  <StyledLabel isFinished={isFinished} colorLabel={colorLabel}>{text}</StyledLabel>
)

const StyledLabel = styled.div<{ isFinished: boolean, colorLabel }>`
  color: ${props => props.colorLabel};
  ${props => props.isFinished && css`
    color: ${({ theme }) => (theme.isDark ? darkColors.earnedCakeDisable : lightColors.earnedCakeDisable)};
  `}
  font-size: 14px;
  font-weight: 600;
  line-height: 17px;
`

export default Label
