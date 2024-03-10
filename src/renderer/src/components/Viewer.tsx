import React, { useEffect, useRef } from 'react'
import ePub from 'epubjs'
import { tocAtom } from '../books/epubToc'
import { useAtom } from 'jotai'
import { motion } from 'framer-motion'
import { showAtom } from '../books/epubShow'

const useEpubRenderer = () => {
  const books = useRef(ePub('../src/assets/angel01.epub'))
  const isMounted = useRef(false)
  const [, setTocAtom] = useAtom(tocAtom)
  

  useEffect(() => {
    const { current: epubInstance } = books
    if (!isMounted.current) {
      epubInstance.ready.then(() => {
        setTocAtom(epubInstance.navigation.toc)
      })
      epubInstance.renderTo('epub-viewer', {
        width: '100%',
        height: '100%',
        allowScriptedContent: true
      } as never)
      epubInstance.rendition.display()
      isMounted.current = true
    }
  }, [])

  return { books }
}

// eslint-disable-next-line react/display-name
const Viewer = React.memo(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { books } = useEpubRenderer()
  const [, setShowAtom] = useAtom(showAtom)

  const handleKeyDown = (event) => {
    if (event.keyCode === 37) {
      // 左箭头键
      books.current.rendition.prev()
    } else if (event.keyCode === 39) {
      // 右箭头键
      books.current.rendition.next()
    }
  }

  const handlePrevClick = () => {
    books.current.rendition.prev();
  };

  const handleNextClick = () => {
    books.current.rendition.next();
  };

  const handleBackClick = () => {
    console.log("123")
    setShowAtom(false)
    // 在这里添加其他状态变化相关的操作
  };


  // 在组件挂载时注册键盘事件监听器
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <motion.div className="p-8 flex justify-center items-center relative">
      <button
          className="absolute top-4 left-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full"
          onClick={handleBackClick}
        >
          <svg
            className="w-6 h-6 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      <button
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full mr-4"
        onClick={handlePrevClick}
      >
        <svg
          className="w-6 h-6 fill-current"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <motion.div
        className="w-96 h-96 bg-white rounded-md shadow-[0_2px_10px_0_rgba(0,0,0,0.3)]"
        id="epub-viewer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      ></motion.div>

      <button
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full ml-4"
        onClick={handleNextClick}
      >
        <svg
          className="w-6 h-6 fill-current"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </motion.div>
  )
})

export default Viewer
