// import Versions from './components/Versions'
// import icons from './assets/icons.svg'
import wifu from '../../../resources/avatar.jpg'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'


function App(): JSX.Element {
  return (
    <div className="md:container w-screen h-screen flex flex-col bg-cyan-700/70">
      <div className="m-6 flex flex-row-reverse">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <img
              className="rounded-full w-12 h-12 outline outline-offset-2 outline-blue-500/50"
              src={wifu}
              alt=""
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
              <DropdownMenu.Item className="DropdownMenuItem">
                New Tab <div className="RightSlot">⌘+T</div>
              </DropdownMenu.Item>
              <DropdownMenu.Item className="DropdownMenuItem">
                New Window <div className="RightSlot">⌘+N</div>
              </DropdownMenu.Item>
              <DropdownMenu.Item className="DropdownMenuItem" disabled>
                New Private Window <div className="RightSlot">⇧+⌘+N</div>
              </DropdownMenu.Item>
              <DropdownMenu.Sub>
                <DropdownMenu.SubTrigger className="DropdownMenuSubTrigger">
                  More Tools
                </DropdownMenu.SubTrigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.SubContent
                    className="DropdownMenuSubContent"
                    sideOffset={2}
                    alignOffset={-5}
                  >
                    <DropdownMenu.Item className="DropdownMenuItem">
                      Save Page As… <div className="RightSlot">⌘+S</div>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="DropdownMenuItem">
                      Create Shortcut…
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="DropdownMenuItem">Name Window…</DropdownMenu.Item>
                    <DropdownMenu.Separator className="DropdownMenu.Separator" />
                    <DropdownMenu.Item className="DropdownMenuItem">
                      Developer Tools
                    </DropdownMenu.Item>
                  </DropdownMenu.SubContent>
                </DropdownMenu.Portal>
              </DropdownMenu.Sub>

              <DropdownMenu.Separator className="DropdownMenuSeparator" />

              <DropdownMenu.Separator className="DropdownMenuSeparator" />

              <DropdownMenu.Label className="DropdownMenuLabel">People</DropdownMenu.Label>

              <DropdownMenu.Arrow className="DropdownMenuArrow" />
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
      <div></div>
    </div>
  )
}

export default App
