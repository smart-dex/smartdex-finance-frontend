import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import { Card, CardBody, Heading, Text } from 'uikit-sotatek'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useI18n from 'hooks/useI18n'
import useApproveConfirmTransaction from 'hooks/useApproveConfirmTransaction'
import { useSdc, useBunnyFactory } from 'hooks/useContract'
import useHasSdcBalance from 'hooks/useHasSdcBalance'
import nftList from 'config/constants/nfts'
import styled from 'styled-components'
import { lightColors, darkColors, baseColors } from 'style/Color'
import SelectionCard from '../components/SelectionCard'
import NextStepButton from '../components/NextStepButton'
import ApproveConfirmButtons from '../components/ApproveConfirmButtons'
import useProfileCreation from './contexts/hook'
import { MINT_COST, STARTER_BUNNY_IDS } from './config'



const TextOne = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? darkColors.colorWap : lightColors.colorStep)};
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  margin-top: 17px;

`
const HeadingStep = styled(Heading)`
  font-weight: bold;
  font-size: 24px;
  line-height: 30px;
  color: ${({ theme }) => (theme.isDark ? darkColors.textSubtle : lightColors.balanceColor)};
  margin-top: 7px;
`
const TextSub = styled(Text)`
  font-size: 14px;
  line-height: 20px;
  display: flex;
  color: ${({ theme }) => (theme.isDark ? darkColors.colorWap : lightColors.colorWap)};
  width: 100%;
  ${({ theme }) => theme.mediaQueries.nav} {
    width: 40%;
  }
`
const CardBox = styled(Card)`
  margin-top: 21px;
  border: 1px solid #E2E2E8;
  box-shadow: 50px 38px 102px rgba(120, 118, 148, 0.14);
  border-radius: 40px
`
const HeadingBox= styled(Heading)`
  font-size: 16px;
  line-height: 20px;
  font-weight: 700;
  color: ${({ theme }) => (theme.isDark ? darkColors.balanceColor: lightColors.balanceColor)};
`

const Textsubtitle = styled(Text)`
  font-size: 14px;
  line-height: 30px;
  display: flex;
  color: ${({ theme }) => (theme.isDark ? darkColors.colorWap : lightColors.colorWap)};
`
const SelectionBox = styled.div`
    box-shadow: none !important;
    position: relative;
    & : checked {
    background-color: ${baseColors.primary}!important;
    }
    & : hover{
    box-shadow: none !important;
    }
    & : active{
    box-shadow: none !important;
    background: none;
    }
    & :focus{
    box-shadow: none !important;
    }
    & < div : active{
    box-shadow: none !important;
    border: 1px solid #0085FF;
  }
`
const SelectText = styled(Text)`
  font-size: 16px;
  line-height: 20px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => (theme.isDark ? darkColors.balanceColor: lightColors.balanceColor)};
`
const nfts = nftList.filter((nft) => STARTER_BUNNY_IDS.includes(nft.bunnyId))
const minimumSdcBalanceToMint = new BigNumber(MINT_COST).multipliedBy(new BigNumber(10).pow(18))

const Mint: React.FC = () => {
  const [bunnyId, setBunnyId] = useState(null)
  const { actions, minimumSdcRequired, allowance } = useProfileCreation()

  const { account } = useWallet()
  const sdcContract = useSdc()
  const bunnyFactoryContract = useBunnyFactory()
  const TranslateString = useI18n()
  const hasMinimumSdcRequired = useHasSdcBalance(minimumSdcBalanceToMint)
  const {
    isApproving,
    isApproved,
    isConfirmed,
    isConfirming,
    handleApprove,
    handleConfirm,
  } = useApproveConfirmTransaction({
    onRequiresApproval: async () => {
      // TODO: Move this to a helper, this check will be probably be used many times
      try {
        const response = await sdcContract.methods.allowance(account, bunnyFactoryContract.options.address).call()
        const currentAllowance = new BigNumber(response)
        return currentAllowance.gte(minimumSdcRequired)
      } catch (error) {
        return false
      }
    },
    onApprove: () => {
      return sdcContract.methods
        .approve(bunnyFactoryContract.options.address, allowance.toJSON())
        .send({ from: account })
    },
    onConfirm: () => {
      return bunnyFactoryContract.methods.mintNFT(bunnyId).send({ from: account })
    },
    onSuccess: () => actions.nextStep(),
  })

  return (
    <>
      <TextOne fontSize="20px" color="textSubtle" bold>
        {TranslateString(999, `Step ${1}`)}
      </TextOne>
      <HeadingStep as="h3" size="xl" mb="24px">
        {TranslateString(776, 'Get Starter Collectible')}
      </HeadingStep>
      <TextSub as="p">
        {TranslateString(786, 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia  consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.')}
        </TextSub>
      <CardBox mb="24px">
        <CardBody>
          <HeadingBox as="h4" size="lg" mb="8px">
            {TranslateString(792, 'Choose your Starter!')}
          </HeadingBox>
          <Textsubtitle as="p" color="textSubtle">
            {TranslateString(794, 'Choose wisely: you can only ever make one starter collectible!')}
          </Textsubtitle>
          <Textsubtitle as="p" mb="24px" color="textSubtle">
            {TranslateString(999, `Cost: ${MINT_COST} SDC`, { num: MINT_COST })}
          </Textsubtitle>
          {nfts.map((nft) => {
            const handleChange = (value: string) => setBunnyId(parseInt(value, 10))

            return (
              <SelectionBox>
                <SelectionCard
                key={nft.bunnyId}
                name="mintStarter"
                value={nft.bunnyId}
                image={`/images/nfts/${nft.images.md}`}
                isChecked={bunnyId === nft.bunnyId}
                onChange={handleChange}
                disabled={isApproving || isConfirming || isConfirmed || !hasMinimumSdcRequired}
              >
                <SelectText bold>{nft.name}</SelectText>
              </SelectionCard>
              </SelectionBox>
            )
          })}
          {!hasMinimumSdcRequired && (
            <Text color="failure" mb="16px">
              {TranslateString(1098, `A minimum of ${MINT_COST} SDC is required`)}
            </Text>
          )}
          <ApproveConfirmButtons
            isApproveDisabled={bunnyId === null || isConfirmed || isConfirming || isApproved}
            isApproving={isApproving}
            isConfirmDisabled={!isApproved || isConfirmed || !hasMinimumSdcRequired}
            isConfirming={isConfirming}
            onApprove={handleApprove}
            onConfirm={handleConfirm}
          />
        </CardBody>
      </CardBox>
      <NextStepButton onClick={actions.nextStep} disabled={!isConfirmed}>
        {TranslateString(798, 'Next Step')}
      </NextStepButton>
    </>
  )
}

export default Mint
