import styled from 'styled-components'

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
<<<<<<< HEAD
  max-width: 1500px;
=======
  width: calc(100%-240px);
>>>>>>> origin/master
  padding-left: 16px;
  padding-right: 16px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 24px;
    padding-right: 24px;
  }
`

export default Container
