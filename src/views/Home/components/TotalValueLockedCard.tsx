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
  color: ${({ theme }) => theme.isDark ?  darkColors.text : lightColors.textMenuLeft };
  font-weight: 500;
`

const TextStyle = styled(Text)`
  color: ${({ theme }) => theme.isDark ?  darkColors.text : lightColors.textMenuLeft };
`

const HeadingStyle = styled(Heading)`
  color: ${({ theme }) => theme.isDark ?  darkColors.text : lightColors.textMenuLeft };
`

const TotalValueLockedCard = () => {
  const TranslateString = useI18n()
  const data = useGetStats()
  const tvl = data ? data.total_value_locked_all.toLocaleString('en-US', { maximumFractionDigits: 0 }) : null

  return (
    <StyledTotalValueLockedCard>
      <CardBody>
        <HeadingEarn size="lg" mb="24px">
          {TranslateString(762, 'Total Value Locked (TVL)')}
        </HeadingEarn>
        {data ? (
          <>
            <HeadingStyle size="xl" >{`$${tvl}`}</HeadingStyle>
            <TextStyle>{TranslateString(764, 'Across all LPs and Syrup Pools')}</TextStyle>
          </>
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
