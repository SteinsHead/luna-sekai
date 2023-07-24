import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const NavigatorMenu = () => {
  const [activeItem, setActiveItem] = useState(0)
  const items = ['主页', '添加', '同步', '关于']
  return (
    <>
      <NavigationMenu.Root className="relative justify-center flex w-full z-50">
        <NavigationMenu.List className="flex bg-white p-3 rounded list-none shadow-[0_2px_10px_0_rgba(0,0,0,0.3)] m-0">
          {items.map((item, index) => (
            <NavigationMenu.Item key={item}>
              <NavigationMenu.Trigger
                className={`px-3 py-2 outline-0 font-black leading-3 text-violet-500 ${
                  index === activeItem ? 'border-b-2 border-b-violet-400' : ''
                }`}
                onClick={() => setActiveItem(index)}
              >
                {item}
              </NavigationMenu.Trigger>
              <AnimatePresence>
                {activeItem === index && (
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  ></motion.div>
                )}
              </AnimatePresence>
            </NavigationMenu.Item>
          ))}
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </>
  )
}

export default NavigatorMenu
