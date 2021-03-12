import React from 'react'
import styled from 'styled-components'
import { Text } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { darkColors, lightColors, baseColors } from '../../../../style/Color'

const Wrapper = styled.div`
  display: flex;
  margin: 36px 0 28px;
  justify-content: flex-end;
`

const LegendItem = styled.div`
  display: flex;
  margin-right: 18px;
  align-items: center;
`

const Circle = styled.div<{ isPoolSize?: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background-color: ${({ isPoolSize }) => (isPoolSize ? '#A6D997' : baseColors.primary)};
  margin-right: 6px;
`

const TextStyle = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? darkColors.text : lightColors.textMenuLeft)};
`

const Legend = () => {
  const TranslateString = useI18n()

  return (
    <Wrapper>
      <LegendItem>
        <Circle isPoolSize />
        <TextStyle>{TranslateString(748, 'Pool Size')}</TextStyle>
      </LegendItem>
      <LegendItem>
        <Circle />
        <TextStyle>{TranslateString(750, 'Burned')}</TextStyle>
      </LegendItem>
    </Wrapper>
  )
}

export default Legend
