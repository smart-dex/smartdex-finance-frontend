import React, { useContext } from 'react'
import styled from 'styled-components'
import { Breadcrumbs, Heading, Text } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { lightColors, darkColors } from 'style/Color'
import { ProfileCreationContext } from './contexts/ProfileCreationProvider'


const Wrapper = styled.div`
  border-bottom: 2px solid ${({ theme }) => theme.colors.textSubtle};
  margin-bottom: 24px;
  padding-bottom: 24px;
`
const HeadingTitle = styled(Heading)`
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 30px;
  color: ${({ theme }) => (theme.isDark ? darkColors.textSubtle : lightColors.textIfolight)};
`
const HeadingNote  = styled(Heading)`
  font-size: 14px;
  line-height: 17px;
  align-items: center;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 20px;
  font-weight: 400;
  color: ${({ theme }) => (theme.isDark ? darkColors.colorWap : lightColors.colorCol)};
`
const TextStep = styled(Text)`
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => (theme.isDark ? darkColors.colorWap : lightColors.textStep)};
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
  }
`
const WrapperTitle = styled.div`
  border-bottom: 1px dashed ${({ theme }) => (theme.isDark ? darkColors.lineDriver : lightColors.lineDriver)} !important;
  padding: 20px 0;
`

const StyleHeader = styled.div`
  .step-active {
    color: ${({ theme }) => (theme.isDark ? darkColors.colordarkStep : lightColors.colorLightStep)};
  }
  .step-not-active{
    color: ${({ theme }) => (theme.isDark ? darkColors.darkStep : lightColors.lightStep)};
  }
`

const steps = [
  { translationId: 776, label: 'Get Starter Collectible' },
  { translationId: 778, label: 'Set Profile Picture' },
  { translationId: 780, label: 'Join Team' },
  { translationId: 782, label: 'Set Name' },
]

const Header: React.FC = () => {
  const TranslateString = useI18n()
  const { currentStep } = useContext(ProfileCreationContext)

  return (
    <WrapperTitle>
      <HeadingTitle as="h1" size="xxl" color="secondary" mb="8px">
        {TranslateString(770, 'Profile Setup')}
      </HeadingTitle>
      <HeadingNote as="h2" size="lg" mb="8px">
        {TranslateString(772, 'Check your stats and collect achievements')}
      </HeadingNote>
      {/* <Text color="textSubtle" mb="24px">
        {TranslateString(999, 'Total cost: 1.5 SDC')}
      </Text> */}
      <Breadcrumbs>
        {steps.map(({ translationId, label }, index) => {
          return (
            <StyleHeader>
              <TextStep key={label} className={currentStep >= index ? 'step-active' : 'step-not-active'}>
                {TranslateString(translationId, label)}
              </TextStep>
            </StyleHeader>
          )
        })}
      </Breadcrumbs>
    </WrapperTitle>
  )
}

export default Header
