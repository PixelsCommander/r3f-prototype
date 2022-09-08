import {Table} from "@/components/canvas/Table";
import {OrthographicCamera, Plane} from "@react-three/drei";
import {BettingGrid} from "@/components/canvas/BettingGrid/BettingGrid";
import {useGameStore} from "@/GameStore";
import {Ref, useRef} from "react";
import {Object3DNode, useFrame, useThree} from "@react-three/fiber";

export function CasinoGame() {
  const show3d = useGameStore((state) => state.state.show3d);
  const showLight = useGameStore((state) => state.state.showLight);
  const { viewport } = useThree();
  const light: Ref<Object3DNode<any, any>> = useRef();

  useFrame(({mouse}) => {
    if (light.current) {
      // @ts-ignore
      const x = (mouse.x * viewport.width) / 2
      const y = (mouse.y * viewport.height) / 2
      light.current.position.set(x, y, 0);
    }
  })

  const bettingGrids = new Array(3).fill(0).map((v, i) => <BettingGrid
    position={[-300 + i * 250,-200, -100]} key={i}/>);


  return <>
    {/*// @ts-ignore*/}
    <Plane scale={[3000,3000,3000]} position={[0,-500,-500]} rotation={[-Math.PI / 2,0,0]}>
      <meshStandardMaterial color={'black'} metallness={0.5}/>
    </Plane>
    <Table
    showBettingGrid={show3d}
  />
    {/*//@ts-ignore*/}
    <OrthographicCamera
      makeDefault
      zoom={1}
      far={10000}
      near={-10000}
      position={[0, 0, 100]}
    >
      {bettingGrids}
      {showLight ? <pointLight
        position={[-200, 200, 0]}
        ref={light}
        intensity={2}
      /> : <ambientLight/>}
    </OrthographicCamera>
    </>;
}
