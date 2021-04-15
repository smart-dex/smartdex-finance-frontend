import React from 'react'
import styled from 'styled-components'
import { Heading, Text, Flex } from 'uikit-sotatek'
import { darkColors, lightColors } from 'style/Color'

interface IfoCardHeaderProps {
  ifoId: string
  name: string
  subTitle: string
}

const StyledIfoCardHeader = styled(Flex)`
  position: relative;
  & > div {
    flex: 1;
  }
  margin-bottom: 20px;
`
const Avatar = styled(Flex)`
  position: static;
  left: -80px;
  top: 0px;
  background: ${lightColors.backAvatar};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  transform: translateY(-15px);
  max-width: 40px;
  margin-right: 15px;
  & img {
    max-width: 20px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    position: absolute;
    transform: translateY(0px);
    width: 60px;
    height: 60px;
    max-width: 60px;
    margin-right: 0px;
    & img {
      max-width: 35px;
    }
  }
`

const Name = styled(Heading).attrs({ as: 'h3' })`
  margin-bottom: 4px;
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
  color: ${({ theme }) => (theme.isDark ? darkColors.text : lightColors.textMenuLeft)};
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 24px;
    line-height: 29px;
  }
`

const Description = styled(Text)`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-weight: 500;
  font-size: 11px;
  line-height: 13px;
  color: ${({ theme }) => (theme.isDark ? darkColors.text : lightColors.textMenuLeft)};
  margin-bottom: 35px;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 14px;
    line-height: 17px;
    margin-bottom: 0;
  }
`

const IfoCardHeader: React.FC<IfoCardHeaderProps> = ({ ifoId, name, subTitle }) => {
  return (
    <StyledIfoCardHeader alignItems="center">
      <Avatar>
        <img src={`/images/ifos/${ifoId}.svg`} alt="" />
      </Avatar>
      <div>
        <Name>{name}</Name>
        <Description>{subTitle}</Description>
      </div>
    </StyledIfoCardHeader>
  )
}

export default IfoCardHeader
