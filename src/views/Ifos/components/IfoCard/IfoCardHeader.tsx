import React from 'react'
import styled from 'styled-components'
import { Heading, Text, Flex } from '@pancakeswap-libs/uikit'

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
`
const Avatar = styled(Flex)`
  position: static;
  left: -80px;
  top: 10px;
  background: rgba(255, 161, 78, 0.1);
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
  color: #5f5e76;
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
  color: #5f5e76;
  margin-bottom: 30px;
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
        <img src={`/images/ifos/${ifoId}.svg`} alt={ifoId} />
      </Avatar>
      <div>
        <Name>{name}</Name>
        <Description>{subTitle}</Description>
      </div>
    </StyledIfoCardHeader>
  )
}

export default IfoCardHeader
