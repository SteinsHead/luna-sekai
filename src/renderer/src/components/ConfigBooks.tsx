import wife from '../../../../resources/wife.jpg'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const ConfigBooks = () => {
  return (
    <>
      <div className="flex flex-row w-full h-full mt-2">
        <div className="flex w-full outline m-2 rounded flex-col justify-center items-center">
          <p>在这个浮躁的世界里</p>
          <p>希望你可以享受得来不易的阅读时光</p>
          <img
            src={wife}
            alt=""
            className="rounded w-60 mt-2 shadow-[0_2px_10px_0_rgba(0,0,0,0.3)]"
          />
        </div>
      </div>
    </>
  )
}

export default ConfigBooks
