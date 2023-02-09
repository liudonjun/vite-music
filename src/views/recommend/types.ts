type bannerItem = {
  'id': number
  'digest': string
  'pic': string
  'detail': string
}
type albumsItem = {
  'id': string
  'name': string
  'pic': string
  'artist_name': string
  'count_play': string
  'desc': string
}

type topBtnOptionType = {
  id: string
  flag: boolean
  name: string
}

export type { bannerItem, albumsItem, topBtnOptionType }
