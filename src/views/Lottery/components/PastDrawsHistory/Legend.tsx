import React from 'react'
import styled from 'styled-components'
import { Text, Heading } from 'smartdex-uikit'
import useI18n from 'hooks/useI18n'
import { darkColors, lightColors, baseColors } from '../../../../style/Color'

const Wrapper = styled.div`
  margin: 0 8px 28px;
  justify-content: space-between;
  ${({ theme }) => theme.mediaQueries.nav} {
    display: flex;
    margin: 8px 0 28px;
  }
`
const LegendItem = styled.div`
  display: flex;
  margin-right: 18px;
  align-items: center;
`
const Circle = styled.div<{ isPoolSize?: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 10px;
  background-color: ${({ isPoolSize }) => (isPoolSize ? '#A6D997' : baseColors.primary)};
  margin-right: 6px;
`

const TextStyle = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? darkColors.text : lightColors.textMenuLeft)};
  font-size: 12px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 14px;
  }
`
const HeadingStyle = styled(Heading)`
  color: ${({ theme }) => (theme.isDark ? darkColors.text : lightColors.textMenuLeft)};
  font-size: 18px;
`
const LegendBlock = styled.div`
  display: flex;
  margin-top: 8px;
  ${({ theme }) => theme.mediaQueries.nav} {
    margin-top: 0px;
  }

`
const Legend = () => {
  const TranslateString = useI18n()
  return (
    <Wrapper>
      <HeadingStyle>{TranslateString(746, 'History')}</HeadingStyle>
      <LegendBlock>
        <LegendItem>
          <Circle isPoolSize />
          <TextStyle>{TranslateString(748, 'Pool Size')}</TextStyle>
        </LegendItem>
        <LegendItem>
          <Circle />
          <TextStyle>{TranslateString(750, 'Burned')}</TextStyle>
        </LegendItem>
      </LegendBlock>
    </Wrapper>
  )
}
export default Legend
