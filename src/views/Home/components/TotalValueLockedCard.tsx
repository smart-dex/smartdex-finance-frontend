import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Skeleton, Text } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { darkColors, lightColors } from '../../../style/Color'
import { useGlobalData } from '../../../contexts/GlobalData'
import { formattedNum } from '../../../utils'

const StyledTotalValueLockedCard = styled(Card)`
min-height: 203px;
  border: 1px solid ${({ theme }) => (theme.isDark ? darkColors.borderColor : lightColors.borderColor)};
  background: ${({ theme }) => (theme.isDark ? darkColors.backIfo : lightColors.backIfo)};
  box-shadow: 14px 14px 20px rgba(120, 118, 148, 0.1);
  border-radius: 40px;
  margin-bottom: 25px;
  ${({ theme }) => theme.mediaQueries.nav} {
    min-height: 230px;
    margin-bottom: 20px;
  }
`
const HeadingBlock = styled.div`
  margin-bottom: 15px;
`
const HeadingEarn = styled(Heading)`
  color: ${({ theme }) => (theme.isDark ? darkColors.textDescriptionMenu : lightColors.textDescriptionMenu)};
  font-weight: 600;
  font-size: 13px;
  line-height: 50px;
  margin-bottom: 10px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 14px;
    line-height: 40px;
    margin-bottom: 24px;
  }
`
const TextStyle = styled(Text)`
color: ${({ theme }) => (theme.isDark ? darkColors.textDescriptionMenu : lightColors.textDescriptionMenu)};
  font-weight: 600;
  font-size: 13px;
  line-height: 50px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 14px;
    line-height: 40px;
  }
`
const HeadingStyle = styled(Heading)`
  color: ${({ theme }) => (theme.isDark ? darkColors.textLogoMenuLeft : lightColors.textLogoMenuLeft)};
  font-size: 32px;
  font-weight: 600;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 36px;
  }
`

const TotalValueLockedCard = () => {
  const TranslateString = useI18n()
  const { totalLiquidityUSD } = useGlobalData()
  const tvl = formattedNum(totalLiquidityUSD, true)
  if (tvl) {
    localStorage.setItem("tvl",tvl.toString())
  }
  const tvlLocalStorage = localStorage.getItem("tvl")
  const valueTvl = tvl || tvlLocalStorage 
  return (
    <StyledTotalValueLockedCard>
      <CardBody>
        <HeadingBlock>
          <HeadingEarn>{TranslateString(762, 'Total Value Locked (TVL)')}</HeadingEarn>
          {valueTvl  ? <HeadingStyle>{valueTvl}</HeadingStyle> : <> </>}
        </HeadingBlock>
        {valueTvl ? (
          <TextStyle>{TranslateString(764, 'Across all LPs')}</TextStyle>
        ) : (
            <>
              <Skeleton height={66} />
            </>
          )}
      </CardBody>
    </StyledTotalValueLockedCard>
  )
}

export default TotalValueLockedCard
