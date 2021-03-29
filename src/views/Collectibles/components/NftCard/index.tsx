import React, { useState } from 'react'
import { lightColors, darkColors, baseColors } from 'style/Color'
import styled from 'styled-components'
import {
  Card,
  CardBody,
  Heading,
  Tag,
  Button,
  ChevronUpIcon,
  ChevronDownIcon,
  CardFooter,
  useModal,
} from 'uikit-sotatek'
import { useProfile } from 'state/hooks'
import useI18n from 'hooks/useI18n'
import { Nft } from 'config/constants/types'
import InfoRow from '../InfoRow'
import TransferNftModal from '../TransferNftModal'
import ClaimNftModal from '../ClaimNftModal'
import Preview from './Preview'

interface NftCardProps {
  nft: Nft
  canClaim?: boolean
  tokenIds?: number[]
  onSuccess: () => void
}

const Header = styled(InfoRow)`
  justify-content: center;
  padding: 13px 0;
  h2 {
    line-height: 22px;
    font-size: 16px;
    text-align: center;
    color: ${({ theme }) => (theme.isDark ? darkColors.balanceColor : lightColors.balanceColor)};
    ${({ theme }) => theme.mediaQueries.nav} {
      font-size: 18px;
    }
  }
`

const DetailsButton = styled(Button)`
  height: auto;
  padding: 12px 0px;
  width: 100%;
  color: ${baseColors.primary};
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  background: none !important;
  box-shadow: none !important;
  &:hover:not(:disabled):not(:active) {
    background-color: transparent;
  }
  &:focus:not(:active) {
    box-shadow: none;
  }
`
const StyleCard = styled(Card)`
  background: ${({ theme }) => (theme.isDark ? darkColors.bgCardCollectibles : lightColors.bgCardCollectibles)};
  border: 1px solid ${({ theme }) => (theme.isDark ? darkColors.borderCard : lightColors.borderCard)};
  box-shadow: 50px 38px 102px ${({ theme }) => (theme.isDark ? darkColors.shadowCardCollectibles : lightColors.shadowCardCollectibles)};
  border-radius: 40px;
`

const InfoBlock = styled.div`
  font-size: 12px;
  line-height: 143%;
  text-align: center;
  letter-spacing: -0.03em;
  color: ${lightColors.colorCol};
  color: ${({ theme }) => (theme.isDark ? darkColors.colorInfoBlock : lightColors.colorInfoBlock)};
  min-height: 65px;
  ${({ theme }) => theme.mediaQueries.nav} {
    height: 70px;
  }
`
const SubCard = styled.div`
  padding: 0 30px;
`
const StyleCardFooter = styled(CardFooter)`
  border-top: 1px solid ${({ theme }) => (theme.isDark ? darkColors.borderCard : lightColors.borderCard)};
`

const NftCard: React.FC<NftCardProps> = ({ nft, onSuccess, canClaim = false, tokenIds = [] }) => {
  const [isOpen, setIsOpen] = useState(false)
  const TranslateString = useI18n()
  const { profile } = useProfile()
  const { bunnyId, name, description } = nft
  const walletOwnsNft = tokenIds.length > 0
  const Icon = isOpen ? ChevronUpIcon : ChevronDownIcon

  const handleClick = async () => {
    setIsOpen(!isOpen)
  }

  const [onPresentTransferModal] = useModal(<TransferNftModal nft={nft} tokenIds={tokenIds} onSuccess={onSuccess} />)
  const [onPresentClaimModal] = useModal(<ClaimNftModal nft={nft} onSuccess={onSuccess} />)

  return (
    <StyleCard isActive={walletOwnsNft || canClaim}>
      <Preview nft={nft} isOwned={walletOwnsNft} />
      <SubCard>
        <CardBody style={{ padding: 0 }}>
          <Header>
            <Heading>{name}</Heading>
            {walletOwnsNft && (
              <Tag outline variant="secondary">
                {TranslateString(999, 'In Wallet')}
              </Tag>
            )}
            {profile?.nft?.bunnyId === bunnyId && (
              <Tag outline variant="success">s
                {TranslateString(999, 'Profile Pic')}
              </Tag>
            )}
          </Header>
          {canClaim && (
            <Button mt="24px" onClick={onPresentClaimModal}>
              {TranslateString(999, 'Claim this NFT')}
            </Button>
          )}
          {walletOwnsNft && (
            <Button variant="secondary" mt="24px" onClick={onPresentTransferModal}>
              {TranslateString(999, 'Transfer')}
            </Button>
          )}
        </CardBody>
        <StyleCardFooter p="0">
          <DetailsButton endIcon={<Icon width="20px" color={baseColors.primary} />} onClick={handleClick}>
            {TranslateString(658, isOpen ? 'Hide' : 'Detail')}
          </DetailsButton>
          <InfoBlock>{isOpen && description}</InfoBlock>
        </StyleCardFooter>
      </SubCard>
    </StyleCard>
  )
}

export default NftCard
