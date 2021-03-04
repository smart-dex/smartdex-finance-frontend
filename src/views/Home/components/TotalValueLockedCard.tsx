import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Skeleton, Text } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { useGetStats } from 'hooks/api'

const StyledTotalValueLockedCard = styled(Card)`
  align-items: center;
  display: flex;
  flex: 1;
  border: 1px solid #e2e2e8;
  box-shadow: 50px 38px 102px rgba(120, 118, 148, 0.14);
`
const HeadingEarn = styled(Heading)`
  color: #5f5e76;
  font-weight: 500;
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
            <Heading size="xl" color="#5F5E76">{`$${tvl}`}</Heading>
            <Text color="#5F5E76">{TranslateString(764, 'Across all LPs and Syrup Pools')}</Text>
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
