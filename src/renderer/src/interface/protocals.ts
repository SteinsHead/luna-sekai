export type TBookType = 'EPUB'

export interface IBook {
  hash: string
  type: TBookType
  name: string
  author: string
  ts: number
  removed?: boolean
  cover?: string
}

// highlights and annotations
export interface IBookNote {
  cfi: string
  // cfi start
  start: string
  // cfi start
  end: string
  page: number
  // for note
  text?: string
  // default to ''
  annotation?: string
  // timestamp
  modified: number
  removed?: number
}

export interface IBookConfig {
  ts: number
  // remote
  lastProgress: number
  // always local
  progress: number
  bookmarks: IBookNote[]
  notes: IBookNote[]
  // only remote
  removedTs?: { [cfi: string]: number }
}
