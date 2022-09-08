import {GLTFLoader} from "three-stdlib";
import {useLoader} from "@react-three/fiber";
import {BettingGrid} from "@/components/canvas/BettingGrid/BettingGrid";

export function Table({ showBettingGrid }) {
  const { scene } = useLoader(GLTFLoader, '/simple_roulette_table.glb');

  return <>
    <primitive
    position={[0, -150, -300]}
    scale={2}
    object={scene}
    receiveShadow
  >
      {showBettingGrid && <BettingGrid
        position={[200, 0, -70]}
        rotation={[- (Math.PI / 2), 0, Math.PI]}
        scale={[0.5, 0.5, 0.5]}
      />}
    </primitive>

  </>;
}
