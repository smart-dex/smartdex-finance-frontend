import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import { lightColors, darkColors, baseColors, brandColors } from 'style/Color'
import styled from 'styled-components'
import { Button, Modal } from 'smartdex-uikit'
import { getFullDisplayBalance } from 'utils/formatBalance'
import TicketInput from 'components/TicketInput'
import ModalActions from 'components/ModalActions'
import { useMultiBuyLottery, useMaxNumber } from 'hooks/useBuyLottery'
import useI18n from 'hooks/useI18n'
import { LOTTERY_MAX_NUMBER_OF_TICKETS, LOTTERY_TICKET_PRICE } from 'config'
import { useCurrentTime } from 'hooks/useTimer'

interface BuyTicketModalProps {
  max: BigNumber
  onConfirm?: (amount: string, numbers: Array<number>) => void
  onDismiss?: () => void
  tokenName?: string
}

const BuyTicketModal: React.FC<BuyTicketModalProps> = ({ max, onDismiss }) => {
  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const [, setRequestedBuy] = useState(false)
  const TranslateString = useI18n()
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max)
  }, [max])

  const maxTickets = useMemo(() => {
    return parseInt(getFullDisplayBalance(max.div(LOTTERY_TICKET_PRICE)), 10)
  }, [max])

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => setVal(e.currentTarget.value)

  const { onMultiBuy } = useMultiBuyLottery()
  const maxNumber = useMaxNumber()
  const handleBuy = useCallback(async () => {
    try {
      setRequestedBuy(true)
      const length = parseInt(val)
      // @ts-ignore
      // eslint-disable-next-line prefer-spread
      const numbers = Array.apply(null, { length }).map(() => [
        Math.floor(Math.random() * maxNumber) + 1,
        Math.floor(Math.random() * maxNumber) + 1,
        Math.floor(Math.random() * maxNumber) + 1,
        Math.floor(Math.random() * maxNumber) + 1,
      ])
      const txHash = await onMultiBuy(LOTTERY_TICKET_PRICE.toString(), numbers)
      // user rejected tx or didn't go thru
      if (txHash) {
        setRequestedBuy(false)
      }
    } catch (e) {
      console.error(e)
    }
  }, [onMultiBuy, setRequestedBuy, maxNumber, val])

  const handleSelectMax = useCallback(() => {
    if (Number(maxTickets) > LOTTERY_MAX_NUMBER_OF_TICKETS) {
      setVal(LOTTERY_MAX_NUMBER_OF_TICKETS.toString())
    } else {
      setVal(maxTickets.toString())
    }
  }, [maxTickets])

  const sdcCosts = (amount: string): number => {
    return +amount * LOTTERY_TICKET_PRICE
  }


  const currentMillis = useCurrentTime()
  const getNextLotteryDrawTime = (currentMilliss) => {
    const date = new Date(currentMilliss)
    const currentHour = date.getUTCHours()
    const currentMinute = date.getUTCMinutes()
    let millisTimeOfNextDraw
    if (currentMinute < 45) {
      millisTimeOfNextDraw = date.setUTCHours(currentHour, 45, 0, 0)
    } else {
      millisTimeOfNextDraw = date.setUTCHours(currentHour + 1, 45, 0, 0)
    }

    return millisTimeOfNextDraw
  }
  const nextLotteryDrawTime = getNextLotteryDrawTime(currentMillis)
  const msUntilLotteryDraw = nextLotteryDrawTime - currentMillis

  return (
    <Modal title={TranslateString(450, 'Enter amount of tickets to buy')} onDismiss={onDismiss}>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"/>
      <TicketInput
        value={val}
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        max={fullBalance}
        symbol= { TranslateString(12224, "TICKET")}
        availableSymbol="SDC"
        thousandSeparator=""
      />
      <div>
        <Tips>1 {TranslateString(12204, 'Ticket')} = {LOTTERY_TICKET_PRICE} SDC</Tips>
      </div>
      <div>
        <Announce>
          {TranslateString(478, 'Ticket purchases are final. Your SDC cannot be returned to you after buying tickets.')}
        </Announce>
        <Final>{TranslateString(460, 'You will spend:')} {sdcCosts(val)} SDC</Final>
      </div>
      <ModalActions>
        <StyleButtonCancel variant="secondary" onClick={onDismiss}>
          {TranslateString(462, 'Cancel')}
        </StyleButtonCancel>
        <StyleButtonConfirm
          id="lottery-buy-complete"
          disabled={
            pendingTx ||
            parseInt(val) > Number(maxTickets) ||
            parseInt(val) > LOTTERY_MAX_NUMBER_OF_TICKETS ||
            parseInt(val) < 1 || val === '' || msUntilLotteryDraw < 10000 || msUntilLotteryDraw > 2700000
          }
          onClick={async () => {
            setPendingTx(true)
            await handleBuy()
            setPendingTx(false)
            onDismiss()
          }}
        >
          {pendingTx ? TranslateString(488, 'Pending Confirmation') : TranslateString(464, 'Confirm')}
        </StyleButtonConfirm>
      </ModalActions>
    </Modal>
  )
}

export default BuyTicketModal

const Tips = styled.div`
  color: ${({ theme }) => (theme.isDark ? darkColors.textMenuLeft : lightColors.textMenuLeft)};
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  margin-bottom: 9px;
  margin-top: 12px;
`
const Final = styled.div`
  color: ${({ theme }) => (theme.isDark ? darkColors.textMenuLeft : lightColors.textMenuLeft)};
  margin-top: 18px;
  text-align: center;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  margin-bottom: 10px;
`
const Announce = styled.div`
  color: ${lightColors.borderNoProfileCard};
  font-size: 11px;
  line-height: 13px;
`
const StyleButtonCancel = styled(Button)`
color: ${ baseColors.primary};
border-color: ${ baseColors.primary};
  box-shadow: ${({ theme }) => (theme.isDark ? 'none' : '0px 4px 10px rgba(222, 222, 222, 0.24)')};
  border-radius: 10px;
  font-weight: 600;
  line-height: 20px;
  min-width: 145px;
  font-size: 12px;
  padding: 0 12px;
  height: 45px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
    padding: 0 24px;
    height: 56px;
  }
`
const StyleButtonConfirm = styled(Button)`
  color: ${brandColors.white};
  background: ${baseColors.primary};
  box-shadow: 0px 4px 10px rgba(222, 222, 222, 0.24);
  border-radius: 10px;
  border: none;
  font-weight: 600;
  line-height: 20px;
  min-width: 145px;
  font-size: 12px;
  padding: 0 12px;
  height: 45px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
    padding: 0 24px;
    height: 56px;
  }
`
