
export const getNetwork = (payType) => {
  let network = '56'
  if (payType === 'icp') {
    network = '998'
  } else if (payType === 'busd') {
    network = '5656'
  }
  return network
}