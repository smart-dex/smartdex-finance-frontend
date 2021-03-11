import React, { useEffect, useRef } from 'react'
import CountUp from 'react-countup'
import styled, { css } from 'styled-components'
import { Text } from 'uikit-sotatek'
import { lightColors, darkColors } from 'style/Color'

interface TextProps {
  isDisabled?: boolean
  fontSize?: string
  color?: string
}

interface BalanceProps extends TextProps {
  value?: number
  decimals?: number
  unit?: string
}

const StyledText = styled(Text)<TextProps>`
  color: ${({ theme }) => (theme.isDark ? darkColors.balanceColor : lightColors.balanceColor)};
  ${(props) =>
    props.isDisabled &&
    css`
      opacity: 0.5;
    `}
  color: ${({ color }) => color};
  font-weight: 600;
  line-height: 29px;
`

const Balance: React.FC<BalanceProps> = ({ value, fontSize, color, decimals, isDisabled, unit }) => {
  const previousValue = useRef(0)

  useEffect(() => {
    previousValue.current = value
  }, [value])

  return (
    <StyledText bold color={color} fontSize={fontSize} isDisabled={isDisabled}>
      <CountUp start={previousValue.current} end={value} decimals={decimals} duration={1} separator="," />
      {value && unit && <span>{unit}</span>}
    </StyledText>
  )
}

Balance.defaultProps = {
  fontSize: '32px',
  isDisabled: false,
  color: 'text',
  decimals: 3,
}

export default Balance
