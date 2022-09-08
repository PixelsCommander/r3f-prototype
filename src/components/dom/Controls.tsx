import {useGameStore} from "@/GameStore";

export default function Controls() {
  const {toggle3d, toggleLight, toggleAnimations, toggleSprites} = useGameStore((state) => state);

  return (
    <div
      className='absolute max-w-lg px-4 py-2 text-sm bg-gray-900 shadow-xl select-none md:text-base top-8 left-1/2 text-gray-50 transform -translate-x-1/2'
      style={{
        textDecoration: 'underline',
        maxWidth: 'calc(100% - 28px)',
      }}
    >
      <a href="#" onClick={toggle3d}>Enable betting grid</a>
      <div/>
      <a href="#" onClick={toggleLight}>Get light</a>
      <div/>
      <a href="#" onClick={toggleAnimations}>More animations</a>
      <div/>
      <a href="#" onClick={toggleSprites}>Sprite sheets</a>
    </div>
  )
}
