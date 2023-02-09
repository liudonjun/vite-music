const filterNumber = (number: number | string) => {
  const num = Number(number)
  if (num < 1000) {
    return num
  }
  if (num < 10000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  if (num < 10000000) {
    return (num / 10000).toFixed(1) + 'W'
  }
  return (num / 100000000).toFixed(1) + '亿'
}

export { filterNumber }
