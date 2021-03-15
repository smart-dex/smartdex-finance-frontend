import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useI18n from 'hooks/useI18n'
import { useAllHarvest } from 'hooks/useHarvest'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import UnlockButton from 'components/UnlockButton'
import CakeHarvestBalance from './CakeHarvestBalance'
import CakeWalletBalance from './CakeWalletBalance'
import { lightColors, darkColors, baseColors } from '../../../style/Color'

const StyledFarmStakingCard = styled(Card)`
  min-height: 169px;
  border: 1px solid ${({ theme }) => (theme.isDark ? darkColors.borderColor : lightColors.borderColor)};
  box-shadow: 50px 38px 102px rgba(120, 118, 148, 0.14);
  margin-bottom: 32px;
  background: ${({ theme }) => (theme.isDark ? darkColors.backIfo : lightColors.backIfo)};
`

const Actions = styled.div`
  justify-self: center;
  margin-bottom: 0;
  ${({ theme }) => theme.mediaQueries.nav} {
    justify-self: end;
  }
`
const BlockCakeHarvest = styled.div`
  display: flex;
  padding-bottom: 25px;
  justify-content: space-between;
  ${({ theme }) => theme.mediaQueries.nav} {
    flex-direction: column;
    padding-top: 24px;
  }
`

const BlockCakeWallet = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 35px;
  ${({ theme }) => theme.mediaQueries.nav} {
    flex-direction: column;
    padding-top: 24px;
  }
`

const CardImage = styled.img`
  margin-right: 16px;
`

const HeadingBlock = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
`

const Label = styled.div`
  font-size: 10px;
  padding-right: 50px;
  padding-bottom: 8px;
  color: ${baseColors.primary};
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 14px;
  }
`
const HeadingStyle = styled(Heading)`
  font-size: 20px;
  color: ${({ theme }) => (theme.isDark ? darkColors.text : lightColors.textMenuLeft)};
  font-weight: bold;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 26px;
  }
`

const FarmedStakingCard = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWallet()
  const TranslateString = useI18n()
  const farmsWithBalance = useFarmsWithBalance()
  const balancesWithValue = farmsWithBalance.filter((balanceType) => balanceType.balance.toNumber() > 0)

  const { onReward } = useAllHarvest(balancesWithValue.map((farmWithBalance) => farmWithBalance.pid))

  const harvestAllFarms = useCallback(async () => {
    setPendingTx(true)
    try {
      await onReward()
    } catch (error) {
      // TODO: find a way to handle when the user rejects transaction or it fails
    } finally {
      setPendingTx(false)
    }
  }, [onReward])

  return (
    <StyledFarmStakingCard>
      <CardBody style={{ padding: '16px 28px 28px' }}>
        <HeadingBlock>
          <CardImage src="/images/pan-cake.png" alt="cake logo" width={50} />
          <HeadingStyle>{TranslateString(542, 'Farms & Staking')}</HeadingStyle>
        </HeadingBlock>

        <BlockCakeHarvest>
          <Label>{TranslateString(544, 'CAKE to Harvest')}:</Label>
          <CakeHarvestBalance />
        </BlockCakeHarvest>

        <BlockCakeWallet>
          <Label>{TranslateString(546, 'CAKE in Wallet')}:</Label>
          <CakeWalletBalance />
        </BlockCakeWallet>
        <Actions>
          {account ? (
            <Button
              id="harvest-all"
              disabled={balancesWithValue.length <= 0 || pendingTx}
              onClick={harvestAllFarms}
              style={{ width: '100%' }}
            >
              {pendingTx
                ? TranslateString(548, 'Collecting CAKE')
                : TranslateString(532, `Harvest all (${balancesWithValue.length})`)}
            </Button>
          ) : (
            <UnlockButton style={{ width: '100%' }} />
          )}
        </Actions>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default FarmedStakingCard
