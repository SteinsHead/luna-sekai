import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { useAtom } from 'jotai'
import ItemToc from './ItemToc'
import Viewer from './Viewer'
import Books from './Books'
import { showAtom } from '../books/epubShow'
import { tocAtom } from '../books/epubToc'
import { useState } from 'react'
import * as Collapsible from '@radix-ui/react-collapsible'
import { RowSpacingIcon, Cross2Icon } from '@radix-ui/react-icons'
import { AnimatePresence, motion } from 'framer-motion'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const MainPages = () => {
  const [toc] = useAtom(tocAtom)
  const [show] = useAtom(showAtom)
  const [open, setOpen] = useState(true)

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleTocClick = () => {
    setOpen(!open)
  }

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div className="flex flex-row w-full h-full mt-2">
          <Collapsible.Root
            open={open}
            onOpenChange={() => setOpen(!open)}
            className={`flex ${
              open ? 'w-1/4' : 'w-11'
            } outline m-2 rounded justify-center whitespace-normal p-2 relative`}
          >
            <Collapsible.Trigger asChild>
              <button
                className="h-7 w-7 rounded-full bg-gray-300 hover:bg-gray-400 absolute top-2 right-2 flex justify-center items-center"
                onClick={handleTocClick}
              >
                {open ? <Cross2Icon /> : <RowSpacingIcon />}
              </button>
            </Collapsible.Trigger>
            <Collapsible.Content>
              <NavigationMenu.Root orientation="horizontal">
                <NavigationMenu.List>
                  {show ? <ItemToc toc={toc}></ItemToc> : <div>待显示目录</div>}
                  <NavigationMenu.Indicator />
                </NavigationMenu.List>

                <NavigationMenu.Viewport />
              </NavigationMenu.Root>
            </Collapsible.Content>
          </Collapsible.Root>
          <motion.div className="flex-grow outline m-2 rounded justify-center overflow-auto whitespace-normal">
            {show ? <Viewer></Viewer> : <Books></Books>}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default MainPages
