import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import UnlockButton from 'components/UnlockButton'
import { darkColors, lightColors } from '../../../style/Color'

const StyledCardBody = styled(CardBody)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const StyledHeading = styled(Heading)`
  margin: 16px 0;
  font-weight: 500;
  font-size: 16px;
  color: ${({ theme }) => (theme.isDark ? darkColors.text : lightColors.textMenuLeft)};
`

const IconWrapper = styled.div`
  svg {
    width: 80px;
    height: 80px;
  }
`

const TicketImg = styled.img`
  width: 110px;
  height: 110px;
`

const CardStyle = styled(Card)`
  border: 1px solid ${({ theme }) => (theme.isDark ? '#2F344B' : '#E2E2E8')};
  box-shadow: none;
`

const UnlockWalletCard = () => {
  const TranslateString = useI18n()

  return (
    <CardStyle isActive>
      <StyledCardBody>
        <IconWrapper>
          <TicketImg src="images/ticket-lottery.png" />
        </IconWrapper>
        <StyledHeading size="md">{TranslateString(1080, 'Unlock wallet to access lottery')}</StyledHeading>
        <UnlockButton />
      </StyledCardBody>
    </CardStyle>
  )
}

export default UnlockWalletCard
