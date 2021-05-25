import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Contract } from 'web3-eth-contract'
import { ethers } from 'ethers'
import { useDispatch } from 'react-redux'
import { useToast } from 'state/hooks'
import { updateUserAllowance, fetchFarmUserDataAsync } from 'state/actions'
import { approve } from 'utils/callHelpers'
import { useStakingReward, useSdc, useSousChef, useLottery } from './useContract'

// Approve a Farm
export const useApprove = (lpContract: Contract, farmPid: number) => {
  const dispatch = useDispatch()
  const { toastError } = useToast()
  const { account }: { account: string } = useWallet()
  const stakingContract = useStakingReward(farmPid)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, stakingContract, account)
      dispatch(fetchFarmUserDataAsync(account))
      return tx
    } catch (e) {
      toastError('Error', "Please try again. Confirm the transaction and make sure you are paying enough gas!")
      return false
    }
  }, [account, dispatch, lpContract, stakingContract,toastError])

  return { onApprove: handleApprove }
}

// Approve a Pool
export const useSousApprove = (lpContract: Contract, sousId) => {
  const dispatch = useDispatch()
  const { account }: { account: string } = useWallet()
  const sousChefContract = useSousChef(sousId)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, sousChefContract, account)
      dispatch(updateUserAllowance(sousId, account))
      return tx
    } catch (e) {
      return false
    }
  }, [account, dispatch, lpContract, sousChefContract, sousId])

  return { onApprove: handleApprove }
}

// Approve the lottery
export const useLotteryApprove = () => {
  const { account }: { account: string } = useWallet()
  const sdcContract = useSdc()
  const lotteryContract = useLottery()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(sdcContract, lotteryContract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, sdcContract, lotteryContract])

  return { onApprove: handleApprove }
}

// Approve an IFO
export const useIfoApprove = (tokenContract: Contract, spenderAddress: string) => {
  const { account } = useWallet()
  const onApprove = useCallback(async () => {
    try {
      const tx = await tokenContract.methods
        .approve(spenderAddress, ethers.constants.MaxUint256)
        .send({ from: account })
      return tx
    } catch {
      return false
    }
  }, [account, spenderAddress, tokenContract])

  return onApprove
}
