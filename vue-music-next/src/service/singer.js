import { get } from './base'

export function getSingerList() {
  return get('/api/getSingerList')
}
// 歌手详情
export function getSingerDetail(singer) {
  return get('/api/getSingerDetail', {
    mid: singer.mid
  })
}
