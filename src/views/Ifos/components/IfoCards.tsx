import styled from 'styled-components'

interface IfoCardWrapperProps {
  isSingle?: boolean
}

const IfoCardWrapper = styled.div<IfoCardWrapperProps>`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 32px;
  padding-bottom: 30px;
  padding-top: 30px;

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: ${({ isSingle }) => `repeat(${isSingle ? 1 : 1}, 1fr)`};
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-bottom: 40px;
    padding-top: 40px;
  }
`

IfoCardWrapper.defaultProps = {
  isSingle: false,
}

export default IfoCardWrapper
