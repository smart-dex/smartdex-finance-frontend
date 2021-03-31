import React from 'react'
import styled from 'styled-components'
import { Button, LinkExternal, useModal } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useTickets from 'hooks/useTickets'
import UnlockButton from 'components/UnlockButton'
import { baseColors } from 'style/Color'
import MyTicketsModal from '../TicketCard/UserTicketsModal'

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding-top: 24px;

  & > div {
    flex: 1;
    width: 100%;
  }
`

const ExternalLinkWrap = styled(LinkExternal)`
  align-items: center;
  display: flex;
  height: 48px;
  justify-content: center;
  text-decoration: none;
  width: 100%;
  color: ${ baseColors.primary};
  svg {
    fill: ${ baseColors.primary};
  }
`

const IconDirect = styled.img`
  width: 10px;
  ${({ theme }) => theme.mediaQueries.nav} {
    width: 16px;
  }
`

const BoxIconDirect = styled.div`
  position: absolute;
  right: 0px;
  top: 0px;
  height: 100%;
  background: #0085ff;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  width: 24px;
  text-align: center;
  line-height: 45px;
  ${({ theme }) => theme.mediaQueries.nav} {
    width: 36px;
    line-height: 60px;
  }
`

const TicketCard: React.FC<{ contractLink?: string; lotteryNumber?: number }> = ({ contractLink, lotteryNumber }) => {
  const TranslateString = useI18n()
  const tickets = useTickets(lotteryNumber)
  const ticketsLength = tickets.length
  const [onPresentMyTickets] = useModal(<MyTicketsModal myTicketNumbers={tickets} from="buy" />)
  const { account } = useWallet()

  if (!account) {
    return (
      <Wrapper>
        <UnlockButton
          endIcon={
            <BoxIconDirect>
              <IconDirect src="/images/home/icon-direct.svg" alt="" />
            </BoxIconDirect>
          }
          style={{ width: '100%' }}
        />
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <div>
        <Button disabled={ticketsLength === 0} onClick={onPresentMyTickets} style={{ width: '100%' }}>
          {TranslateString(432, 'View Your Tickets')}
        </Button>
      </div>
      <div>
        <ExternalLinkWrap href={contractLink}>{TranslateString(356, 'View on BscScan')}</ExternalLinkWrap>
      </div>
    </Wrapper>
  )
}

export default TicketCard
