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

const StyledFarmStakingCard = styled(Card)`
  min-height: 169px;
  border: 1px solid #e2e2e8;
  box-shadow: 50px 38px 102px rgba(120, 118, 148, 0.14);
  margin-bottom: 32px;
`

const Actions = styled.div`
  margin-bottom: 20px;
  grid-area: c;
  justify-self: end;
  @media (max-width: 600px) {
    justify-self: center;
    margin-bottom: 0;
  }
`
const BlockCakeHarvest = styled.div`
  display: flex;
  grid-area: a;
  @media (max-width: 600px) {
    padding-top: 39px;
    padding-bottom: 25px;
    justify-content: space-between;
  }
`

const BlockCakeWallet = styled.div`
  display: flex;
  grid-area: b;
  @media (max-width: 600px) {
    padding-bottom: 35px;
    justify-content: space-between;
  }
`

const Block = styled.div`
  margin-top: 8px;
  display: grid;

  grid-template-areas:
    'c c c '
    'a b d ';
  @media (max-width: 600px) {
    grid-template-areas:
      'a'
      'b'
      'c';
  }
`

const CardImage = styled.img`
  margin-bottom: 16px;
  margin-left: 20px;
  position: absolute;
  top: 23px;
`

const Label = styled.div`
  color: #17c267;
  font-size: 14px;
  padding-right: 50px;
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
      <CardBody style={{ padding: '32px' }}>
        <Heading size="xl" style={{ fontSize: '24px' }} color="#5F5E76">
          {TranslateString(542, 'Farms & Staking')}
          <CardImage src="/images/pan-cake.png" alt="cake logo" width={40} />
        </Heading>
        <Block>
          <Actions>
            {account ? (
              <Button
                id="harvest-all"
                disabled={balancesWithValue.length <= 0 || pendingTx}
                onClick={harvestAllFarms}
                style={{ width: '178px' }}
              >
                {pendingTx
                  ? TranslateString(548, 'Collecting CAKE')
                  : TranslateString(532, `Harvest all (${balancesWithValue.length})`)}
              </Button>
            ) : (
              <UnlockButton style={{ width: '178px' }} />
            )}
          </Actions>

          <BlockCakeHarvest>
            <Label>{TranslateString(544, 'CAKE to Harvest')}:</Label>
            <CakeHarvestBalance />
          </BlockCakeHarvest>

          <BlockCakeWallet>
            <Label>{TranslateString(546, 'CAKE in Wallet')}:</Label>
            <CakeWalletBalance />
          </BlockCakeWallet>
        </Block>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default FarmedStakingCard
