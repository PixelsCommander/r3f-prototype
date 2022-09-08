import { Sprite } from 'three';
import {useEffect, useMemo, useRef, useState} from "react";
import { useSpring } from '@react-spring/core';
import { a } from "@react-spring/three";
import {useTexture} from "@react-three/drei";
import {useGameStore} from "@/GameStore";
import {ItemState} from "../../../../types";
import {useFrame} from "@react-three/fiber";
import {useAnimatedSprite} from "use-animated-sprite";

const itemSize = 30;

function getItemState(x, y, state) {
  if (state[x] !== undefined && state[x][y] !== undefined) {
    return state[x][y];
  } else {
    return ItemState.Off;
  }
}


export function BettingGrid({position = [0, 0 , 0], scale = [1, 1, 1], rotation = [0, 0, 0], width = 4, height = 4}) {
  const itemsFlat = [];

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < width; y++) {
      const item = <BettingGridItem
        x = {x}
        y = {y}
        key={x + '-' + y}/>;
      itemsFlat.push(item);
    }
  }

  return <mesh
    scale={scale}
    rotation={rotation}
    position={position}>
    {itemsFlat}
  </mesh>;
}


const CrazyCube = ({x, y}) => {
  const mesh = useRef();
  // @ts-ignore
  const {showAnimations} = useGameStore((state) => state.state);

  useFrame(() => {
    if (showAnimations) {
      // @ts-ignore
      mesh.current.position.y = Math.sin(Date.now() / 1000) * 50 * y / x;
    }
  })

  // @ts-ignore
  return <a.mesh
    position={[0, 0, 0]}
    ref={mesh}
  >
    <a.meshStandardMaterial attach="material" color={"black"} />
    <boxBufferGeometry args={[itemSize / 1.5, 10, 10]}/>
  </a.mesh>
}

const BettingGridItem = ({x, y}) => {
  // @ts-ignore
  const state = useGameStore(state => state.state.bettingState[x][y]);
  // @ts-ignore
  const setBettingState = useGameStore(state => state.setBettingState);
  // @ts-ignore
  const showAnimations = useGameStore((state) => state.state.showAnimations)
  // @ts-ignore
  const showSprites = useGameStore((state) => state.state.showSprites)
  const spriteTexture = useTexture('./icons/multiplier.webp');
  const mesh = useRef();
  const [hovered, setHover] = useState(false);

  const { spring } = useSpring( {
    spring: Number(state === ItemState.On),
    config: { mass: 1, tension: 40, friction: 5, precision: 0.0001 },
  });

  const spriteSpring = (useSpring( {
    spring: Number(state === ItemState.Multiplied),
    config: { mass: 1, tension: 100, friction: 5, precision: 0.0001 },
  })).spring;

  const color = spring.to([0, 1], ["#6246ea", "#e45858"]);
  const spriteScale = spriteSpring.to([0, 1], [0, itemSize]);

  useEffect(() => {
    const interval = setInterval(() => {
        const num = Math.random() * 12;
        if (showAnimations && num < 4) {
          setBettingState(x, y, Math.floor(Math.random() * 12));
        }
    }, 2000);
    return () => clearInterval(interval);
  }, [showAnimations, x, y, setBettingState]);

  const cube = useMemo(() => <CrazyCube x={x} y={y}/>, [x, y]);

  // @ts-ignore
  return <a.mesh
    position={[x * 2 * itemSize, y * 2 * itemSize, 0]}
    ref={mesh}
    onPointerOver={() => setHover(true)}
    onPointerOut={() => setHover(false)}
    onClick={() => {
      setBettingState(x, y, state === ItemState.Off ? ItemState.On : ItemState.Off)
    }}
    onDoubleClick={() => {
      setBettingState(x, y, ItemState.Multiplied);
    }}
    scale={hovered ? 1.1 : 1}
  >
    {cube}
    <a.meshStandardMaterial attach="material" color={color} />
    <sphereBufferGeometry args={[itemSize / 1.5, 10, 10]}/>
    {showSprites ? <SpriteOverlay scale={spriteScale} position={[0, 0, itemSize]}/> : <a.sprite scale={spriteScale} position={[0, 0, itemSize]}>
      <spriteMaterial map={spriteTexture} />
    </a.sprite>}
  </a.mesh>
}

function SpriteOverlay({scale, position}) {
  const spriteRef = useRef<Sprite>();
  const texture = useAnimatedSprite(spriteRef, {
    spriteSheetUrl: `/dabAnimation.png`, // Required - The path or full URL to the sprite sheet
    xCount: 32, // Required - the number of sprites along the X axis the spritesheet is divided into
    yCount: 1, // Required - the number of sprites along the Y axis the spritesheet is divided into
    spriteFrames: 32, // Required - the number of frames for this sprite
    spriteX: 1, // Required - the start x position of this sprite (not pixels, but number of sprites from "left")
    spriteY: 0, // Required - the start y position of this sprite (not pixels, but the number of sprites from "bottom")
    interval: 0.015,
  });

  return (
    // @ts-ignore
    <a.sprite scale={scale} position={position} ref={spriteRef}>
      <spriteMaterial map={texture} />
    </a.sprite>
  )
}
