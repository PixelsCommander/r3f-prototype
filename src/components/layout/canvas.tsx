import {Canvas, useFrame} from '@react-three/fiber'
import {OrbitControls, OrthographicCamera, Preload} from '@react-three/drei'
import useStore from '@/helpers/store'
import {useEffect, useRef} from 'react'
import {CasinoGame} from "@/components/canvas/CasinoGame";

const LControl = () => {
  const dom = useStore((state) => state.dom)
  const control = useRef(null)

  useEffect(() => {
    if (control.current) {
      // @ts-ignore
      const domElement = dom.current
      const originalTouchAction = domElement.style['touch-action'] 
      domElement.style['touch-action'] = 'none'

      return () => {
        domElement.style['touch-action'] = originalTouchAction
      }
    }
  }, [dom, control])
  // @ts-ignore
  return <OrbitControls ref={control} domElement={dom.current} />
}

const LCanvas = ({ children }) => {
  const dom = useStore((state) => state.dom)

  // @ts-ignore
  return (
    <Canvas
      // @ts-ignore
      mode='concurrent'
      style={{
        position: 'absolute',
        top: 0,
      }}
      // @ts-ignore
      onCreated={(state) => state.events.connect(dom.current)}
    >
      <LControl />
      <Preload all />
      {children}
    </Canvas>
  )
}

export default LCanvas
