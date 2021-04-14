import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { getProfileContract } from 'utils/contractHelpers'
import makeBatchRequest from 'utils/makeBatchRequest'
import { useToast } from 'state/hooks'

const useGetProfileCosts = () => {
  const [costs, setCosts] = useState({
    numberSdcToReactivate: new BigNumber(0),
    numberSdcToRegister: new BigNumber(0),
    numberSdcToUpdate: new BigNumber(0),
  })
  const { toastError } = useToast()

  useEffect(() => {
    const fetchCosts = async () => {
      try {
        const profileContract = getProfileContract()
        const [numberSdcToReactivate, numberSdcToRegister, numberSdcToUpdate] = await makeBatchRequest([
          profileContract.methods.numberSdcToReactivate().call,
          profileContract.methods.numberSdcToRegister().call,
          profileContract.methods.numberSdcToUpdate().call,
        ])

        setCosts({
          numberSdcToReactivate: new BigNumber(numberSdcToReactivate as string),
          numberSdcToRegister: new BigNumber(numberSdcToRegister as string),
          numberSdcToUpdate: new BigNumber(numberSdcToUpdate as string),
        })
      } catch (error) {
        // toastError('Error', 'Could not retrieve SDC costs for profile')
      }
    }

    fetchCosts()
  }, [setCosts, toastError])

  return costs
}

export default useGetProfileCosts
