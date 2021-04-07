import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { AutoRenewIcon, Button, Card, CardBody, Heading, Skeleton, Text } from 'uikit-sotatek'
import { Link as RouterLink } from 'react-router-dom'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import nftList from 'config/constants/nfts'
import useI18n from 'hooks/useI18n'
import { useToast } from 'state/hooks'
import { getSmartDEXChainProfileAddress } from 'utils/addressHelpers'
import { useSmartDEXChainRabbits } from 'hooks/useContract'
import useGetWalletNfts from 'hooks/useGetWalletNfts'
import { lightColors, darkColors, baseColors } from 'style/Color'
import SelectionCard from '../components/SelectionCard'
import NextStepButton from '../components/NextStepButton'
import { ProfileCreationContext } from './contexts/ProfileCreationProvider'


const Link = styled(RouterLink)`
  color: ${({ theme }) => theme.colors.primary};
`

const NftWrapper = styled.div`
  margin-bottom: 24px;
`
const TextStepTwo = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? darkColors.colorWap : lightColors.colorStep)};
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  margin-top: 17px;
 `
const HeadingText = styled(Heading)`
  font-weight: bold;
  font-size: 24px;
  line-height: 30px;
  color: ${({ theme }) => (theme.isDark ? darkColors.textSubtle : lightColors.balanceColor)};
  margin-top: 7px;
`
const CardBoxCon = styled(CardBody)`
  margin-top: 21px;
  border: 1px solid #E2E2E8;
  box-shadow: 50px 38px 102px rgba(120, 118, 148, 0.14);
  border-radius: 40px
`
const TextSubTwo = styled(Text)`
  font-size: 14px;
  line-height: 20px;
  display: flex;
  color: ${({ theme }) => (theme.isDark ? darkColors.colorWap : lightColors.colorWap)};
  width: 100%;
  ${({ theme }) => theme.mediaQueries.nav} {
    width: 40%;
`

const ProfilePicture: React.FC = () => {
  const [isApproved, setIsApproved] = useState(false)
  const [isApproving, setIsApproving] = useState(false)
  const { tokenId, actions } = useContext(ProfileCreationContext)
  const TranslateString = useI18n()
  const { isLoading, nfts: nftsInWallet } = useGetWalletNfts()
  const smartDEXChainRabbitsContract = useSmartDEXChainRabbits()
  const { account } = useWallet()
  const { toastError } = useToast()
  const bunnyIds = Object.keys(nftsInWallet).map((nftWalletItem) => Number(nftWalletItem))
  const walletNfts = nftList.filter((nft) => bunnyIds.includes(nft.bunnyId))

  const handleApprove = () => {
    smartDEXChainRabbitsContract.methods
      .approve(getSmartDEXChainProfileAddress(), tokenId)
      .send({ from: account })
      .on('sending', () => {
        setIsApproving(true)
      })
      .on('receipt', () => {
        setIsApproving(false)
        setIsApproved(true)
      })
      .on('error', (error) => {
        toastError('Error', error?.message)
        setIsApproving(false)
      })
  }

  if (!isLoading && walletNfts.length === 0) {
    return (
      <>
        <Heading size="xl" mb="24px">
          {TranslateString(852, 'Oops!')}
        </Heading>
        <Text bold fontSize="20px" mb="24px">
          {TranslateString(854, 'We couldn’t find any SmartDEX Collectibles in your wallet.')}
        </Text>
        <Text as="p">
          {TranslateString(
            856,
            'You need a SmartDEX Collectible to finish setting up your profile. If you sold or transferred your starter collectible to another wallet, you’ll need to get it back or acquire a new one somehow. You can’t make a new starter with this wallet address.',
          )}
        </Text>
      </>
    )
  }

  return (
    <>
      <TextStepTwo fontSize="20px" color="textSubtle" bold>
        {TranslateString(999, `Step ${2}`)}
      </TextStepTwo>
      <HeadingText as="h3" size="xl" mb="24px">
        {TranslateString(778, 'Set Profile Picture')}
      </HeadingText>
      <CardBoxCon mb="24px">
        <CardBody>
          <Heading as="h4" size="lg" mb="8px">
            {TranslateString(812, 'Choose collectible')}
          </Heading>
          <TextSubTwo as="p" color="textSubtle">
            {TranslateString(
              814,
              'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis.',
            )}
          </TextSubTwo>
          <Text as="p" color="textSubtle" mb="24px">
            {TranslateString(816, 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis ')}
            <Link to="/collectibles" style={{ marginLeft: '4px' }}>
              {TranslateString(999, 'See the list >')}
            </Link>
          </Text>
          <NftWrapper>
            {isLoading ? (
              <Skeleton height="80px" mb="16px" />
            ) : (
              walletNfts.map((walletNft) => {
                const [firstTokenId] = nftsInWallet[walletNft.bunnyId].tokenIds

                return (
                  <SelectionCard
                    name="profilePicture"
                    key={walletNft.bunnyId}
                    value={firstTokenId}
                    image={`/images/nfts/${walletNft.images.md}`}
                    isChecked={firstTokenId === tokenId}
                    onChange={(value: string) => actions.setTokenId(parseInt(value, 10))}
                  >
                    <Text bold>{walletNft.name}</Text>
                  </SelectionCard>
                )
              })
            )}
          </NftWrapper>
          <Heading as="h4" size="lg" mb="8px">
            {TranslateString(818, 'Allow collectible to be locked')}
          </Heading>
          <Text as="p" color="textSubtle" mb="16px">
            {TranslateString(
              820,
              "The collectible you've chosen will be locked in a smart contract while it’s being used as your profile picture. Don't worry - you'll be able to get it back at any time.",
            )}
          </Text>
          <Button
            isLoading={isApproving}
            disabled={isApproved || isApproving || tokenId === null}
            onClick={handleApprove}
            endIcon={isApproving ? <AutoRenewIcon spin color="currentColor" /> : undefined}
          >
            {TranslateString(564, 'Approve')}
          </Button>
        </CardBody>
      </CardBoxCon>
      <NextStepButton onClick={actions.nextStep} disabled={tokenId === null || !isApproved || isApproving}>
        {TranslateString(798, 'Next Step')}
      </NextStepButton>
    </>
  )
}

export default ProfilePicture
