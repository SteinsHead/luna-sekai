import React, { useState, useEffect, useRef, useCallback } from 'react'
import ePub from 'epubjs'
import { tocAtom } from "../books/epubToc";
import { useAtom } from 'jotai'

const useEpubRenderer = () => {
  const books = useRef(ePub('../src/assets/angel01.epub'))
  const isMounted = useRef(false)
  const [, setTocAtom] = useAtom(tocAtom)

  useEffect(() => {
    const { current: epubInstance } = books

    if (!isMounted.current) {
      console.log('sta')
      epubInstance.ready.then(() => {
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

const Viewer = React.memo(() => {
  const { books } = useEpubRenderer()

  // const clickBooks = (event) => {
  //   const rect = event.currentTarget.getBoundingClientRect()
  //   const clickX = event.clientX - rect.left
  //
  //   // 根据点击位置判断是左侧还是右侧区域
  //   const isLeftArea = clickX < rect.width / 2
  //
  //   if (isLeftArea) {
  //     books.current.rendition.prev() // 点击左侧区域进行上一页翻页操作
  //   } else {
  //     books.current.rendition.next() // 点击右侧区域进行下一页翻页操作
  //   }
  // }

  return (
    <div className="flex flex-[4_1_auto] outline m-2">
      <div className="w-96 h-96 bg-white m-2 z-50" id="epub-viewer"></div>
    </div>
  )
})

export default Viewer
