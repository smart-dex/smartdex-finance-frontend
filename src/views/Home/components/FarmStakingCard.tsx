import React, { useState, useCallback } from 'react'
import { lightColors, darkColors, baseColors } from 'style/Color'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button } from 'uikit-sotatek'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useI18n from 'hooks/useI18n'
import { useAllHarvest } from 'hooks/useHarvest'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import UnlockButton from 'components/UnlockButton'
import CakeHarvestBalance from './CakeHarvestBalance'
import CakeWalletBalance from './CakeWalletBalance'

const StyledFarmStakingCard = styled(Card)`
  min-height: 270px;
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
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  flex-direction: row-reverse;
  ${({ theme }) => theme.mediaQueries.nav} {
    flex-direction: inherit;
  }
`
const HeadingStyle = styled(Heading)`
  color: ${({ theme }) => (theme.isDark ? darkColors.balanceColor : lightColors.balanceColor)};
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 24px;
  }
`
const CardImage = styled.img`
  margin-right: 0px;
  margin-left: 6px;
  ${({ theme }) => theme.mediaQueries.nav} {
    margin-right: 16px;
    margin-left: 0px;
  }
`
const Actions = styled.div`
  justify-self: center;
  margin-bottom: 0;
  margin-top: 30px;
  ${({ theme }) => theme.mediaQueries.nav} {
    justify-self: end;
    margin-top: 80px;
  }
`
const BlockCakeHarvest = styled.div`
  display: flex;
  margin-bottom: 30px;
  justify-content: space-between;
  ${({ theme }) => theme.mediaQueries.nav} {
    margin-bottom: 20px;
    flex-direction: column;
  }
`
const Label = styled.div`
  color: ${baseColors.success};
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;
  ${({ theme }) => theme.mediaQueries.nav} {
    color: ${baseColors.primary};
    font-size: 14px;
    line-height: 17px;
    margin-bottom: 7px;
  }
`
const StyleButtonDisabled = styled(Button)`
  background: ${({ theme }) => (theme.isDark ? darkColors.buttonView : lightColors.buttonView)};
  color: ${baseColors.primary};
  border-radius: 10px;
  box-shadow: ${({ theme }) => (theme.isDark ? 'none' : '0px 4px 10px rgba(239, 239, 239, 0.24)')};
  height: 45px;
  font-weight: 600;
  font-size: 13px;
  position: relative;
  padding-right: 24px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
    height: 56px;
    padding-right: 36px;
  }
  &:disabled {
    background: ${({ theme }) => (theme.isDark ? darkColors.btnDisabledBg : lightColors.btnDisabledBg)};
    color: ${({ theme }) => (theme.isDark ? darkColors.fillSvg : lightColors.fillSvg)};
    box-shadow: ${({ theme }) => (theme.isDark ? 'none' : '0px 4px 10px rgba(222, 222, 222, 0.24)')};
    border-radius: 10px;
    height: 45px;
    font-weight: 600;
    font-size: 13px;
    ${({ theme }) => theme.mediaQueries.nav} {
      font-size: 16px;
      height: 56px;
    }
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
  background: #0085FF;
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
      <CardBody>
        <HeadingBlock>
          <CardImage src="/images/pan-cake.png" alt="SDC logo" width={50} />
          <HeadingStyle>{TranslateString(542, 'Farms & Staking')}</HeadingStyle>
        </HeadingBlock>

        <BlockCakeHarvest>
          <Label>{TranslateString(544, 'SDC to Harvest')}:</Label>
          <CakeHarvestBalance />
        </BlockCakeHarvest>

        <BlockCakeHarvest>
          <Label>{TranslateString(546, 'SDC in Wallet')}:</Label>
          <CakeWalletBalance />
        </BlockCakeHarvest>
        <Actions>
          {account ? (
            <StyleButtonDisabled
              id="harvest-all"
              disabled={balancesWithValue.length <= 0 || pendingTx}
              endIcon={!(balancesWithValue.length <= 0 || pendingTx) && <BoxIconDirect><IconDirect src="/images/home/icon-direct.svg" alt="" /></BoxIconDirect>} 
              onClick={harvestAllFarms}
              style={{ width: '100%' }}
            >
              {pendingTx
                ? TranslateString(548, 'Collecting SDC')
                : TranslateString(532, `Harvest all (${balancesWithValue.length})`)}
            </StyleButtonDisabled>
          ) : (
            <UnlockButton 
              endIcon={<BoxIconDirect><IconDirect src="/images/home/icon-direct.svg" alt="" /></BoxIconDirect>} 
              style={{ width: '100%' }} 
            />
          )}
        </Actions>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default FarmedStakingCard
