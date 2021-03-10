import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Skeleton, Text } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { useGetStats } from 'hooks/api'
import { darkColors, lightColors } from '../../../style/Color'

const StyledTotalValueLockedCard = styled(Card)`
  align-items: center;
  display: flex;
  flex: 1;
  border: 1px solid #e2e2e8;
  box-shadow: 50px 38px 102px rgba(120, 118, 148, 0.14);
`
const HeadingEarn = styled(Heading)`
  color: ${({ theme }) => (theme.isDark ? darkColors.text : lightColors.textMenuLeft)};
  font-weight: 600;
  font-size: 18px;
`

const TextStyle = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? darkColors.text : lightColors.textMenuLeft)};
  font-size: 14px;
  font-weight: 500;
`

const HeadingStyle = styled(Heading)`
  color: ${({ theme }) => (theme.isDark ? darkColors.text : lightColors.textMenuLeft)};
  font-size: 32px;
  font-weight: 600;
`

const HeadingBlock = styled.div`
  display: flex;
  justify-content: space-between;
`

const CardBodyStyle = styled(CardBody)`
  width: 100%;
  padding: 60px 39px 59px 27px;
`

const TotalValueLockedCard = () => {
  const TranslateString = useI18n()
  const data = useGetStats()
  const tvl = data ? data.total_value_locked_all.toLocaleString('en-US', { maximumFractionDigits: 0 }) : null

  return (
    <StyledTotalValueLockedCard>
      <CardBodyStyle>
        <HeadingBlock>
          <HeadingEarn  mb="24px">
            {TranslateString(762, 'Total Value Locked (TVL)')}
          </HeadingEarn>
          { data ? 
          (<HeadingStyle>{`$${tvl}`}</HeadingStyle>) : (<> </>)
          }
        </HeadingBlock>
        
        {data ? (
            <TextStyle>{TranslateString(764, 'Across all LPs and Syrup Pools')}</TextStyle>
        ) : (
          <>
            <Skeleton height={66} />
          </>
        )}
      </CardBodyStyle>
    </StyledTotalValueLockedCard>
  )
}

export default TotalValueLockedCard
