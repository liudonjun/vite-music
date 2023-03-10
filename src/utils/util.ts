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

export function shuffle(source: any) {
  const arr = source.slice()
  for (let i = 0; i < arr.length; i++) {
    const j = getRandomInt(i)
    swap(arr, i, j)
  }
  return arr
}

function getRandomInt(max: any) {
  return Math.floor(Math.random() * (max + 1))
}

function swap(arr: any, i: number, j: number) {
  const t = arr[i]
  arr[i] = arr[j]
  arr[j] = t
}

export function formatTime(interval: any) {
  interval = interval | 0
  const minute = (((interval / 60) | 0) + '').padStart(2, '0')
  const second = ((interval % 60) + '').padStart(2, '0')
  return `${minute}:${second}`
}

export { filterNumber }
