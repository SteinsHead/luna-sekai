import * as NavigationMenu from '@radix-ui/react-navigation-menu'

const ItemToc = ({ toc }: tocType) => {
  return (
    <>
      {toc.map((item) => (
        <NavigationMenu.Item key={item.href}>
          {item.label}
          {item.subitems && <ItemToc toc={item.subitems} />}
        </NavigationMenu.Item>
      ))}
    </>
  )
}

interface tocType {
  toc: any
}

export default ItemToc
