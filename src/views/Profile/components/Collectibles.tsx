import React from 'react'
import { Heading, Text, Flex, ChevronRightIcon } from '@pancakeswap-libs/uikit'
import { Link } from 'react-router-dom'
import useI18n from 'hooks/useI18n'
import nfts from 'config/constants/nfts'
import useGetWalletNfts from 'hooks/useGetWalletNfts'
import styled from 'styled-components'
import { lightColors, darkColors, baseColors, brandColors } from 'style/Color'
import CollectibleCard from './CollectibleCard'

const CollectibleList = styled.div`
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(2, 1fr);
  padding: 16px 0;

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-gap: 24px;
    grid-template-columns: repeat(3, 1fr);
    padding: 24px 0;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(4, 1fr);
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    grid-template-columns: repeat(5, 1fr);
  }
`
const HeadingCollect = styled(Heading)`
  font-size: 14px;
  line-height: 22px;
  font-weight: 700;
  color: ${({ theme }) => (theme.isDark ? darkColors.balanceColor : lightColors.textMenuLeft)};
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 18px;
  }
`
const TextCollect = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? darkColors.balanceColor : lightColors.textStep)};
  font-size: 12px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 14px;
  }

`
const FlexFound = styled(Flex)`
  justify-content: start;
  padding: 15px 0px;
`
const FlexCollect = styled(Flex)`
  padding: 20px 0;
  svg{
    fill: ${({ theme }) => (theme.isDark ? darkColors.textSubtle : lightColors.colorLightStep)};
  }
`
const LinkSee = styled(Link)`
    color: ${({ theme }) => (theme.isDark ? darkColors.textSubtle : lightColors.colorLightStep)};
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    svg{
      fill: ${({ theme }) => (theme.isDark ? darkColors.textSubtle : lightColors.colorLightStep)};
    }
`


const Collectibles = () => {
  const TranslateString = useI18n()
  const { nfts: tokenIdsInWallet } = useGetWalletNfts()
  const bunnyIds = Object.keys(tokenIdsInWallet).map((nftWalletItem) => Number(nftWalletItem))
  const nftsInWallet = nfts.filter((nft) => bunnyIds.includes(nft.bunnyId))

  return (
    <>
      <HeadingCollect as="h4" size="md" mb="8px">
        {TranslateString(999, 'SmartDEX Collectibles')}
      </HeadingCollect>
      <TextCollect as="p">
        {TranslateString(
          999,
          'SmartDEX Collectibles are special ERC-721 NFTs that can be used on the SmartDEXChain platform.',
        )}
      </TextCollect>
      <TextCollect as="p">
        {TranslateString(
          999,
          "NFTs in this user's wallet that aren't approved SmartDEX Collectibles won't be shown here.",
        )}
      </TextCollect>
      {nftsInWallet.length > 0 && (
        <CollectibleList>
          {nftsInWallet.map((nftInWallet) => (
            <CollectibleCard key={nftInWallet.bunnyId} nft={nftInWallet} />
          ))}
        </CollectibleList>
      )}
      {nftsInWallet.length === 0 && (
        <FlexFound justifyContent="center" p="32px">
          <Text fontSize="20px" bold color="textDisabled">
            {TranslateString(999, 'No NFTs Found')}
          </Text>
        </FlexFound>
      )}
      <FlexCollect alignItems="center" justifyContent="flex-start">
        <LinkSee to="/collectibles">{TranslateString(999, 'See all approved SmartDEX Collectibles')}</LinkSee>
        <ChevronRightIcon />
      </FlexCollect>
    </>
  )
}

export default Collectibles
