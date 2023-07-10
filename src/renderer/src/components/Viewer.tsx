import React, { useEffect, useRef } from 'react'
import ePub from 'epubjs'
import { tocAtom } from '../books/epubToc'
import { useAtom } from 'jotai'
import { motion } from 'framer-motion'

const useEpubRenderer = () => {
  const books = useRef(ePub('../src/assets/angel01.epub'))
  const isMounted = useRef(false)
  const [, setTocAtom] = useAtom(tocAtom)

  useEffect(() => {
    const { current: epubInstance } = books

    if (!isMounted.current) {
      console.log('sta')
      epubInstance.ready.then(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setTocAtom(epubInstance.navigation.toc)
      })
      epubInstance.renderTo('epub-viewer', {
        width: '100%',
        height: '100%',
        allowScriptedContent: true
      } as never)
      epubInstance.rendition.display()
      console.log('end')

      isMounted.current = true
    }

    const handleKeyDown = (event) => {
      if (event.keyCode === 37) {
        // 左箭头键
        epubInstance.rendition.prev()
      } else if (event.keyCode === 39) {
        // 右箭头键
        epubInstance.rendition.next()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return { books }
}

// eslint-disable-next-line react/display-name
const Viewer = React.memo(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { books } = useEpubRenderer()

  return (
    <motion.div
      className="w-96 h-96 bg-white m-2 z-50 rounded-md shadow-[0_2px_10px_0_rgba(0,0,0,0.3)]"
      id="epub-viewer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    ></motion.div>
  )
})

export default Viewer
