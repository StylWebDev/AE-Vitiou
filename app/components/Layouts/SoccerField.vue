<template>
  <div
    ref="ground"
    class="ground bg-[#238729] size-full relative bg-size-[20%] rounded-lg bg-center bg-[image:var(--field-background)]"
    :style="{ '--field-background': `url('${background}')` }"
  >
    <div class="zone absolute" :style="[zoneFrameStyleValue('home'), computedBorderStyle]">
      <div class="receiver-team">
        <div
          v-for="(player, index) in receivers"
          :key="index"
          class="player absolute text-center inline font-['Questrial',sans-serif] w-2.5 h-2.5 rounded-full
               [animation-duration:5s] [animation-timing-function:linear] [animation-delay:2s]
               [animation-iteration-count:infinite] [animation-direction:alternate] [animation-play-state:running]"
          :class="index === 0 ? 'bg-gray-500' : ''"
          :style="[playerClass(index, 'home', receiverSystem), index === 0 ? '' : `background:${receiverColor};`]"
        >
          <div
            class="player-number absolute top-[85%] left-[85%] p-0 rounded-2xl table my-0 mx-auto text-center font-bold
                 border-white border-solid -translate-x-1/2 -translate-y-1/2 text-[10px] leading-none"
            :class="index === 0 ? 'text-red-600 bg-gray-500!' : 'text-black'"
            :style="playerNumberStyle('home', index)"
          >{{player.number}}</div>
          <div
            v-if="showName"
            class="player-name absolute left-1/2 -translate-x-1/2 bottom-full mb-1 z-10 font-normal text-center leading-[100%] whitespace-nowrap"
            :style="playerComputedName"
          ><span>{{player.name}}</span></div>
        </div>
      </div>
    </div>

    <div
      class="penalty-area absolute border border-white
           after:content-[''] after:absolute after:block after:bg-white after:w-0.5 after:h-0.5
           after:top-17.5 after:right-3.75"
      :style="[penaltyAreaStyleValue('home'), computedBorderStyle]"
    >
      <div class="goal-area absolute border border-white" :style="[goalAreaStyleValue('home'), computedBorderStyle]" />
    </div>

    <div
      class="center-area absolute rounded-full border border-white
           after:content-[''] after:absolute after:block after:bg-white after:border after:border-white
           after:top-1/2 after:left-1/2 after:w-px after:h-px"
      :style="computedCircleStyle"
    />

    <div
      class="penalty-area absolute border border-white
           after:content-[''] after:absolute after:block after:bg-white after:w-0.5 after:h-0.5
           after:top-17.5 after:left-3.75"
      :style="[penaltyAreaStyleValue('visitor'), computedBorderStyle]"
    >
      <div class="goal-area absolute border border-white" :style="[goalAreaStyleValue('visitor'), computedBorderStyle]" />
    </div>

    <div class="zone absolute" :style="[zoneFrameStyleValue('visitor'), computedBorderStyle]">
      <div class="visitor-team">
        <div
          v-for="(player, index) in visitors"
          :key="index"
          class="player absolute text-center inline font-['Questrial',sans-serif] w-2.5 h-2.5 rounded-full
               [animation-duration:5s] [animation-timing-function:linear] [animation-delay:2s]
               [animation-iteration-count:infinite] [animation-direction:alternate] [animation-play-state:running]"
          :class="index === 0 ? 'bg-cyan-400' : ''"
          :style="[playerClass(index, 'visitor', visitorSystem), index === 0 ? '' : `background:${visitorColor};`]"
        >
          <div
            class="player-number absolute top-1/2 left-1/2 p-0 table my-0 mx-auto text-center font-bold
                 border-white border-solid -translate-x-1/2 -translate-y-1/2 text-[10px] leading-none"
            :class="index === 0 ? 'text-red-600' : 'text-white'"
            :style="playerNumberStyle('visitor', index)"
          >{{player.number}}</div>
          <div
            v-if="showName"
            class="player-name absolute left-1/2 -translate-x-1/2 bottom-full mb-1 z-10 font-normal text-center leading-[100%] whitespace-nowrap"
            :style="playerComputedName"
          >{{player.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import background from '~/assets/grass.png';

enum Formation {
  S433 = 'S433',
  S343 = 'S343',
  S442 = 'S442',
  S352 = 'S352',
  S451 = 'S451',
  S3421 = 'S3421',
  S4231 = 'S4231',
}

type OrientationValue = 'landscape' | 'portrait';

interface RatioConfig {
  PENALTY: { LENGTH: number; WIDTH: number };
  GOAL: { LENGTH: number; WIDTH: number };
  CIRCLE: { WIDTH: number };
  PLAYER: { SIZE: number };
}

interface Player {
  number: number;
  name: string;
}

type Target = 'home' | 'visitor';

interface Props {
  borderSize?: number;
  receiverColor?: string;
  visitorColor?: string;
  borderColor?: string;
  playerTextColor?: string;
  showName?: boolean;
  playerRatio?: number;
  borderStyle?: string;
  receiverSystem?: Formation;
  visitorSystem?: Formation;
  externalSize?: number;
  orientation?: OrientationValue;
  receivers?: Player[],
  visitors?: Player[]
}
</script>

<script setup lang="ts">

const {
  borderSize = 2,
  receiverColor = '#3873b8',
  visitorColor = '#d61e00',
  borderColor = '#FFFFFF',
  borderStyle = 'solid',
  orientation = 'landscape',
  externalSize = 10,
  playerRatio = 0.10,
  receiverSystem = 'S433',
  visitorSystem = 'S433',
  playerTextColor = '#ffffff',
  showName = true,
  receivers = [],
  visitors = [],
} = defineProps<Props>()

const RATIO: RatioConfig = reactive({
  PENALTY: { LENGTH: 0.16, WIDTH: 0.61 },
  GOAL: { LENGTH: 0.05, WIDTH: 0.28 },
  CIRCLE: { WIDTH: 0.14 },
  PLAYER: { SIZE: 0.15 },
});

const systems: Record<Formation, ([number,number])[]> = reactive({
  [Formation.S433]: [
    [0.20, 0.50],
    [0.40, 0.20],
    [0.40, 0.40],
    [0.40, 0.60],
    [0.40, 0.80],
    [0.60, 0.25],
    [0.60, 0.50],
    [0.60, 0.75],
    [0.80, 0.25],
    [0.80, 0.50],
    [0.80, 0.75],
  ],
  [Formation.S343]: [
    [0.20, 0.50],
    [0.40, 0.25],
    [0.40, 0.50],
    [0.40, 0.75],
    [0.60, 0.20],
    [0.60, 0.40],
    [0.60, 0.60],
    [0.60, 0.80],
    [0.80, 0.25],
    [0.80, 0.50],
    [0.80, 0.75],
  ],
  [Formation.S442]: [
    [0.20, 0.50],
    [0.40, 0.20],
    [0.40, 0.40],
    [0.40, 0.60],
    [0.40, 0.80],
    [0.60, 0.20],
    [0.60, 0.40],
    [0.60, 0.60],
    [0.60, 0.80],
    [0.80, 0.33],
    [0.80, 0.66],
  ],
  [Formation.S352]: [
    [0.20, 0.50],
    [0.40, 0.25],
    [0.40, 0.50],
    [0.40, 0.75],
    [0.60, 0.16],
    [0.60, 0.33],
    [0.60, 0.49],
    [0.60, 0.66],
    [0.60, 0.82],
    [0.80, 0.33],
    [0.80, 0.66],
  ],
  [Formation.S451]: [
    [0.20, 0.50],
    [0.40, 0.20],
    [0.40, 0.40],
    [0.40, 0.60],
    [0.40, 0.80],
    [0.60, 0.16],
    [0.60, 0.33],
    [0.60, 0.49],
    [0.60, 0.66],
    [0.60, 0.82],
    [0.80, 0.50],
  ],
  [Formation.S3421]: [
    [0.16, 0.50],
    [0.33, 0.25],
    [0.33, 0.50],
    [0.33, 0.75],
    [0.49, 0.20],
    [0.49, 0.40],
    [0.49, 0.60],
    [0.49, 0.80],
    [0.65, 0.33],
    [0.65, 0.66],
    [0.81, 0.50],
  ],
  [Formation.S4231]: [
    [0.16, 0.50],
    [0.33, 0.20],
    [0.33, 0.40],
    [0.33, 0.60],
    [0.33, 0.80],
    [0.49, 0.33],
    [0.49, 0.66],
    [0.66, 0.25],
    [0.66, 0.50],
    [0.66, 0.70],
    [0.82, 0.50],
  ]
})

const ground = useTemplateRef<HTMLDivElement>('ground')
const size = reactive({ w: 0, h: 0 })
let resizeObserver: ResizeObserver | null = null

function syncSize() {
  size.w = ground.value?.clientWidth ?? 0
  size.h = ground.value?.clientHeight ?? 0
}

onMounted(() => {
  syncSize()
  if (ground.value) {
    resizeObserver = new ResizeObserver(syncSize)
    resizeObserver.observe(ground.value)
  }
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
})

const client = computed(() => ({ w: size.w, h: size.h }))

const computedBorderStyle = computed<string>(() => `border: ${borderSize}px ${borderStyle} ${borderColor};`)

const playerComputedName = computed(() => {
  const zone = {w: client.value.w - externalSize * 2 - borderSize * 2, h:client.value.h - externalSize * 2 - borderSize * 2, x:0, y:0};
  const font = 10 + Math.min(zone.w, zone.h) / 15 / 4;
  return `color: ${playerTextColor}; font-size: ${font}px;`;
})

const computedCircleStyle = computed(() => {
  const frame = {w:0, h:0, x:0, y:0};
  const center = {x:client.value.w / 2, y:client.value.h/ 2};
  Object.assign(frame, { w: Math.min(client.value.w, client.value.h) * RATIO.CIRCLE.WIDTH, h: Math.min(client.value.w, client.value.h) * RATIO.CIRCLE.WIDTH });
  Object.assign(frame, { x: center.x - frame.w / 2 - borderSize, y: center.y - frame.h / 2 - borderSize});
  return `width:${frame.w}px;height:${frame.h}px;top:${frame.y}px;left:${frame.x}px;` + computedBorderStyle.value;
})


function playerClass(index: number, target: Target, formation: Formation) {
  const zone = {w: client.value.w - externalSize * 2 - borderSize * 2, h:client.value.h - externalSize * 2 - borderSize * 2, x:0, y:0};
  const dotSize = Math.min(zone.w, zone.h) * playerRatio;
  const frame = {w: dotSize, h: dotSize, x:0, y:0};
  const offset = {x: frame.w / 2, y: frame.h / 2};
  let style = `width: ${frame.w}px; height: ${frame.h}px;`;

  const position = systems[formation]?.[index];

  if (position) {
    if (orientation === 'landscape') {
      if (target === 'visitor') {
        style += `right:${zone.w / 2 * position[0] - offset.x}px;top:${zone.h * position[1] - offset.y}px;`;
      } else {
        style += `left:${zone.w / 2 * position[0] - offset.x}px;top:${zone.h * position[1] - offset.y}px;`;
      }
    }
    else {
      if (target === 'visitor') {
        style += `left:${zone.w * position[1] - offset.x}px;bottom:${zone.h / 2 * position[0] - offset.y}px;`;
      } else {
        style += `left:${zone.w * position[1] - offset.x}px;top:${zone.h / 2 * position[0] - offset.y}px;`;
      }
    }
  }
  return style;
}


function playerNumberStyle(target: Target, index: number) {
  const zone = {w:client.value.w - externalSize * 2 - borderSize * 2, h:client.value.h - externalSize * 2 - borderSize * 2, x:0, y:0};
  const frame = {w:Math.min(zone.w, zone.h) / 15, h:Math.min(zone.w, zone.h) / 15, x:0, y:0};
  const font = 8 + Math.min(zone.w, zone.h) / 15 / 4;
  let style = `width: ${frame.w}px; height: ${frame.h}px;line-height:${frame.h}px;font-size: ${font}px;`;
  style += `margin-top: -${frame.w / 2}px; margin-left: -${frame.h / 2}px;`;
  if (target === 'visitor') {
    style += `background: ${visitorColor}; border: ${borderSize}px;`;
  } else {
    style += `background: ${receiverColor}; border: ${borderSize}px;`;
  }
  // The keeper (index 0) keeps its distinct text-red-600 class from the
  // template; only outfield players get the configurable text color,
  // otherwise this inline style would always win over that class.
  if (index !== 0) {
    style += `color: ${playerTextColor};`;
  }
  return style;
}

function zoneFrameStyleValue(target: Target) {
  const frame = {w:0, h:0, x:0, y:0};
  if (orientation === 'landscape') {
    Object.assign(frame, { x: externalSize, y: externalSize });
    Object.assign(frame, { w: client.value.w / 2 - (externalSize + borderSize), h: client.value.h - (externalSize + borderSize) * 2 });
    return (target === 'visitor')
      ? `width:${frame.w + borderSize+1}px;height:${frame.h}px;top:${frame.y}px;right:${frame.x}px;`
      : `width:${frame.w + borderSize}px;height:${frame.h}px;top:${frame.y}px;left:${frame.x}px;`;
  } else {
    Object.assign(frame, { x: externalSize, y: frame.h + externalSize })
    Object.assign(frame, { w: client.value.w - (externalSize + borderSize) * 2, h: client.value.h / 2 - (externalSize + borderSize) });
    return (target === 'visitor')
      ? `width:${frame.w}px;height:${frame.h}px;bottom:${frame.y}px;left:${frame.x}px;`
      : `width:${frame.w}px;height:${frame.h}px;top:${frame.y}px;left:${frame.x}px;`;
  }
}

function  penaltyAreaStyleValue(target: Target) {
  const frame = {w:0, h:0, x:0, y:0};
  const center = {x:client.value.w / 2, y:client.value.h/ 2};
  if (orientation === 'landscape') {
    Object.assign(frame, { w: client.value.w * RATIO.PENALTY.LENGTH - borderSize, h: client.value.h * RATIO.PENALTY.WIDTH - borderSize * 2 });
    return (target === 'visitor')
      ? `width:${frame.w}px;height:${frame.h}px;top:${center.y - frame.h / 2}px;left:${externalSize}px;`
      : `width:${frame.w}px;height:${frame.h}px;top:${center.y - frame.h / 2}px;right:${externalSize}px;`;
  }
  else {
    Object.assign(frame, { w: client.value.w * RATIO.PENALTY.WIDTH - borderSize, h: client.value.h * RATIO.PENALTY.LENGTH - borderSize * 2 });
    return (target === 'visitor')
      ? `width:${frame.w}px;height:${frame.h}px;top:${externalSize}px;left:${center.x - frame.w / 2}px;`
      : `width:${frame.w}px;height:${frame.h}px;bottom:${externalSize}px;left:${center.x - frame.w / 2}px;`;
  }
}

function  goalAreaStyleValue(target: Target) {
  const frame = {w:0, h:0, x:0, y:0};
  if (orientation === 'landscape') {
    Object.assign(frame, { w: client.value.w * RATIO.GOAL.LENGTH - borderSize, h: client.value.h * RATIO.GOAL.WIDTH - borderSize * 2 });
    const landscapeCenter = { x: (client.value.w * RATIO.PENALTY.LENGTH - borderSize) / 2, y: (client.value.h * RATIO.PENALTY.WIDTH - borderSize * 2) / 2 };
    return (target === 'visitor')
      ? `width:${frame.w}px;height:${frame.h}px;top:${landscapeCenter.y - frame.h / 2}px;left:${-borderSize}px;`
      : `width:${frame.w}px;height:${frame.h}px;top:${landscapeCenter.y - frame.h / 2}px;right:${-borderSize}px;`;
  } else {
    Object.assign(frame, { w: client.value.w * RATIO.GOAL.WIDTH - borderSize, h: client.value.h * RATIO.GOAL.LENGTH - borderSize * 2 });
    const portraitCenter = { x: (client.value.w * RATIO.PENALTY.WIDTH - borderSize) / 2, y: (client.value.h * RATIO.PENALTY.LENGTH - borderSize * 2) / 2 };
    return (target === 'visitor')
      ? `width:${frame.w}px;height:${frame.h}px;top:${-borderSize}px;left:${portraitCenter.x - frame.w / 2}px;`
      : `width:${frame.w}px;height:${frame.h}px;bottom:${-borderSize}px;left:${portraitCenter.x - frame.w / 2}px`;
  }
}
</script>
