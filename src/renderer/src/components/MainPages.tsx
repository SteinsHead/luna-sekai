import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { useAtom } from 'jotai'
import ItemToc from './ItemToc'
import Viewer from './Viewer'
import Books from './Books'
import { showAtom } from '../books/epubShow'
import { tocAtom } from '../books/epubToc'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const MainPages = () => {
  const [toc] = useAtom(tocAtom)
  const [show] = useAtom(showAtom)

  return (
    <>
      <div className="flex flex-row w-full h-full mt-2">
        <div className="flex flex-[1_1_auto] outline m-2 rounded">
          <NavigationMenu.Root orientation="horizontal">
            <NavigationMenu.List>
              {show ? <ItemToc toc={toc}></ItemToc> : <div>待显示目录</div>}
              <NavigationMenu.Indicator />
            </NavigationMenu.List>

            <NavigationMenu.Viewport />
          </NavigationMenu.Root>
        </div>
        <div className="flex flex-[4_1_auto] outline m-2 rounded">
          {show ? <Viewer></Viewer> : <Books></Books>}
        </div>
      </div>
    </>
  )
}

export default MainPages
