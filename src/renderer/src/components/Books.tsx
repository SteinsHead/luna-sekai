import React, { useEffect, useRef } from 'react'
import ePub from 'epubjs'
import { coverAtom } from '../books/epubCover'
import { showAtom } from '../books/epubShow'
import { useAtom } from 'jotai'
import { motion } from 'framer-motion'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import angel from '../../public/angel01.epub'

const useEpubGetter = () => {
  const books = useRef(ePub(angel))
  const isMounted = useRef(false)
  const [, setCoverAtom] = useAtom(coverAtom)

  useEffect(() => {
    const { current: epubInstance } = books

    if (!isMounted.current) {
      console.log('sta')
      epubInstance.ready.then(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        epubInstance.coverUrl().then((value) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          setCoverAtom(value)
        })
      })
      console.log('end')

      isMounted.current = true
    }
  }, [])

  return { books }
}

// eslint-disable-next-line react/display-name
const Books = React.memo(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { books } = useEpubGetter()
  const [cover] = useAtom(coverAtom)
  const [, setShowAtom] = useAtom(showAtom)

  const clickShow = () => {
    setShowAtom(true)
  }

  return (
    <motion.div
      className="w-48 h-72 m-2 z-50 rounded-md shadow-[0_2px_10px_0_rgba(0,0,0,0.3)] overflow-hidden"
      onClick={clickShow}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <img className="object-cover w-full h-full" src={cover} alt="cover" />
    </motion.div>
  )
})

export default Books
