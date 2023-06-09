// import Versions from './components/Versions'
// import icons from './assets/icons.svg'
import wifu from '../../../resources/avatar.jpg'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import Viewer from './components/Viewer'
import Books from './components/Books'
import { useAtom } from 'jotai'
import { tocAtom } from './books/epubToc'
import ItemToc from './components/ItemToc'
import { showAtom } from './books/epubShow'

function App(): JSX.Element {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)
  const [toc] = useAtom(tocAtom)
  const [show] = useAtom(showAtom)

  return (
    <div className="w-screen h-screen flex flex-col bg-cyan-700/50">
      <div className="m-6 flex flex-row-reverse justify-between items-center pr-6 pl-6">
        <DropdownMenu.Root open={isDropDownOpen} onOpenChange={setIsDropDownOpen}>
          <DropdownMenu.Trigger>
            <img
              className="rounded-full w-12 h-12 outline outline-offset-2 outline-blue-500/50"
              src={wifu}
              alt=""
            />
          </DropdownMenu.Trigger>

          <AnimatePresence>
            {isDropDownOpen && (
              <DropdownMenu.Portal forceMount>
                <DropdownMenu.Content align="start" sideOffset={6}>
                  <motion.div
                    className="max-w-[200px] min-w-[100px] bg-gray-300/80 rounded-md shadow-2xl backdrop-blur-sm text-grey-200 p-3 flex flex-col gap-2 text-sm m-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <DropdownMenu.Group className="flex flex-col gap-2">
                      <DropdownMenu.Item>查看书库</DropdownMenu.Item>
                      <DropdownMenu.Item>编辑书库</DropdownMenu.Item>
                      <DropdownMenu.Item>修改资料</DropdownMenu.Item>
                    </DropdownMenu.Group>
                    <DropdownMenu.Separator className="h-px bg-gray-500/50" />
                    <DropdownMenu.Group>
                      <button type="button" className="text-red-400 font-semibold">
                        登出
                      </button>
                    </DropdownMenu.Group>
                  </motion.div>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            )}
          </AnimatePresence>
        </DropdownMenu.Root>
        <div className="flex justify-center items-center h-8 w-14 outline outline-offset-2 outline-blue-500/50 rounded-sm">
          关于
        </div>
        <div className="flex justify-center items-center h-8 w-14 outline outline-offset-2 outline-blue-500/50 rounded-sm">
          同步
        </div>
        <div className="flex justify-center items-center h-8 w-14 outline outline-offset-2 outline-blue-500/50 rounded-sm">
          添加
        </div>
        <div className="flex justify-center items-center h-8 w-14 outline outline-offset-2 outline-blue-500/50 rounded-sm">
          设定
        </div>
      </div>
      <div className="flex flex-row w-full h-full mt-2">
        <div className="flex flex-[1_1_auto] outline m-2">
          <NavigationMenu.Root orientation="horizontal">
            <NavigationMenu.List>
              {show ? <ItemToc toc={toc}></ItemToc> : <div>待显示目录</div>}
              <NavigationMenu.Indicator />
            </NavigationMenu.List>

            <NavigationMenu.Viewport />
          </NavigationMenu.Root>
        </div>
        <div className="flex flex-[4_1_auto] outline m-2">
          <AnimatePresence>{show ? <Viewer></Viewer> : <Books></Books>}</AnimatePresence>
          {/*<Viewer></Viewer>*/}
        </div>
      </div>
    </div>
  )
}

export default App
