import { useState } from 'react'
import { motion } from 'framer-motion'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { pageAtom } from '../books/pages'
import { useEffect } from 'react'
import { useAtom } from 'jotai'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const NavigatorMenu = () => {
  const [activeItem, setActiveItem] = useState(0)
  const items = ['主页', '添加', '同步', '关于']
  const [, setPageAtom] = useAtom(pageAtom)
  const variants = {
    hidden: { width: 0, right: 0 },
    visible: { width: 'auto', right: 5 }
  }
  const transitions = {
    type: 'spring',
    damping: 20,
    stiffness: 100
  }

  useEffect(() => {
    setPageAtom(items[activeItem])
  }, [activeItem])

  return (
    <>
      <NavigationMenu.Root className="relative justify-center flex w-full z-50">
        <NavigationMenu.List className="flex bg-white p-3 rounded list-none shadow-[0_2px_10px_0_rgba(0,0,0,0.3)] m-0">
          {items.map((item, index) => (
            <NavigationMenu.Item key={item}>
              <NavigationMenu.Trigger
                className={`px-3 outline-0 font-black leading-3 text-violet-500 `}
                onClick={() => setActiveItem(index)}
              >
                <div className={`pb-2 ${index === activeItem ? '' : ''}`}>{item}</div>
                {index === activeItem && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={variants}
                    transition={transitions}
                    className="border-b-2 border-violet-400"
                  />
                )}
              </NavigationMenu.Trigger>
            </NavigationMenu.Item>
          ))}
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </>
  )
}

export default NavigatorMenu
