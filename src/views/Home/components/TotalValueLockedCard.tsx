import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Skeleton, Text } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { useGetStats } from 'hooks/api'
import { darkColors, lightColors } from '../../../style/Color'

const StyledTotalValueLockedCard = styled(Card)`
  min-height: 212px;
  border: 1px solid ${({ theme }) => (theme.isDark ? darkColors.borderColor : lightColors.borderColor)};
  background: ${({ theme }) => (theme.isDark ? darkColors.backIfo : lightColors.backIfo)};
  box-shadow: 14px 14px 20px rgba(120, 118, 148, 0.1);
  border-radius: 40px;
  margin-bottom: 25px;
  ${({ theme }) => theme.mediaQueries.nav} {
    min-height: 393px;
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
  const data = useGetStats()
  const tvl = data ? data.total_value_locked_all.toLocaleString('en-US', { maximumFractionDigits: 0 }) : null

  return (
    <StyledTotalValueLockedCard>
      <CardBody>
        <HeadingBlock>
          <HeadingEarn>{TranslateString(762, 'Total Value Locked (TVL)')}</HeadingEarn>
          {data ? <HeadingStyle>{`$${tvl}`}</HeadingStyle> : <> </>}
        </HeadingBlock>

        {data ? (
          <TextStyle>{TranslateString(764, 'Across all LPs and Syrup Pools')}</TextStyle>
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
