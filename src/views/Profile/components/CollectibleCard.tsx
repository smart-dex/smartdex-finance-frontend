import React from 'react'
import styled from 'styled-components'
import { Text } from 'uikit-sotatek'
import { Nft } from 'config/constants/types'
import { lightColors, darkColors } from 'style/Color'


interface CollectibleCardProps {
  nft: Nft
}

const PreviewImage = styled.img`
  border-radius: 4px;
  margin-bottom: 8px;
`
const TextPreview = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? darkColors.textDescriptionMenu : lightColors.textDescriptionMenu)};
`

const CollectibleCard: React.FC<CollectibleCardProps> = ({ nft }) => {
  return (
    <div>
      <PreviewImage src={`/images/nfts/${nft.images.lg}`} />
      <TextPreview bold mb="8px">
        {nft.name}
      </TextPreview>
      <TextPreview as="p" fontSize="12px" color="textSubtle">
        {nft.description}
      </TextPreview>
    </div>
  )
}

export default CollectibleCard
