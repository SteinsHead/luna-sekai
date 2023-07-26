import wifu from '../../../resources/avatar.jpg'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAtom } from 'jotai'
import { pageAtom } from './books/pages'
import NavigatorMenu from './components/NavigatorMenu'
import MainPages from './components/MainPages'
import SyncBooks from './components/SyncBooks'
import AddBooks from './components/AddBooks'
import ConfigBooks from './components/ConfigBooks'

function App(): JSX.Element {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)

  const [isPage] = useAtom(pageAtom)

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type

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
        <NavigatorMenu></NavigatorMenu>
      </div>
      <AnimatePresence>
        {isPage === '主页' ? (
          <MainPages></MainPages>
        ) : isPage === '添加' ? (
          <AddBooks></AddBooks>
        ) : isPage === '同步' ? (
          <SyncBooks></SyncBooks>
        ) : isPage === '关于' ? (
          <ConfigBooks></ConfigBooks>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export default App
