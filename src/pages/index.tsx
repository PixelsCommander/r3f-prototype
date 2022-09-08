import dynamic from 'next/dynamic'
// Step 5 - delete Instructions components
import {BettingGrid} from "@/components/canvas/BettingGrid/BettingGrid";
import {OrthographicCamera} from "@react-three/drei";
import {Table} from "@/components/canvas/Table";
import {useRouter} from "next/router";
import Controls from "@/components/dom/Controls";
import {useGameStore} from "@/GameStore";
import {CasinoGame} from "@/components/canvas/CasinoGame";

// dom components goes here
const Page = (props) => {
  return (
    <>
      <Controls />
    </>
  )
}

// canvas components goes here
// It will receive same props as Page component (from getStaticProps, etc.)
Page.R3F = (props) => {
  return <CasinoGame />;
}

// @ts-ignore
Page.R3F.displayName = 'Pager3f'

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Index',
    },
  }
}
