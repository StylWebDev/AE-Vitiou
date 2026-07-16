<template>
<div ref="ground" class="bg-size-[20%] bg-center bg-[image:var(--field-background)]" :style="{ '--field-background': `url('${backgroundUrl}')` }" >
  <div class="zone" :style="zoneStyle('home')">
    <div class="receiver-team">
      <div v-for="(player, index) in receivers" :key="index" class="player" :style="playerClass(index, player, 'home', receiverSystem)">
        <div class="player-number" :style="playerNumberStyle(index, player, 'home')">{{player.number}}</div>
        <div class="player-name absolute top-1/2 z-10 font-normal text-end leading-[100%]" v-if="showName" :style="playerComputedName"><span>{{player.name}}</span>
        </div>
      </div>
    </div>
  </div>
  <div class="penalty-area" :style="penaltyAreaStyle('home')">
    <div class="goal-area " :style="goalAreaStyle('home')">
    </div>
  </div>
  <div class="center-area" :style="circleStyle()"></div>
  <div class="penalty-area" :style="penaltyAreaStyle('visitor')">
    <div class="goal-area" :style="goalAreaStyle('visitor')">
    </div>
  </div>
  <div class="zone" :style="zoneStyle('visitor')">
    <div class="visitor-team">
      <div v-for="(player, index) in visitors" :key="index" class="player" :class="playerClass(index, player, 'home', receiverSystem)">
        <div class="player-number" :style="playerNumberStyle(index, player, 'visitor')">{{player.number}}</div>
        <div class="player-name" v-if="showName" :style="playerComputedName">{{player.name}}</div>
      </div>
    </div>
  </div>
</div>

</template>

<script lang="ts">
  import backgroundUrl from '~/assets/grass.png';

  interface RatioConfig {
    PENALTY: { LENGTH: number; WIDTH: number };
    GOAL: { LENGTH: number; WIDTH: number };
    CIRCLE: { WIDTH: number };
    PLAYER: { SIZE: number };
  }

  enum Formation {
    S433 = 'S433',
    S343 = 'S343',
    S442 = 'S442',
    S352 = 'S352',
    S451 = 'S451',
    S3421 = 'S3421',
    S4231 = 'S4231',
  }

  interface Player {
    number: number;
    name: string;
  }

  interface RatioConfig {
    PENALTY: { LENGTH: number; WIDTH: number };
    GOAL: { LENGTH: number; WIDTH: number };
    CIRCLE: { WIDTH: number };
    PLAYER: { SIZE: number };
  }

  type Target = 'home' | 'visitor';

  interface Props {
    borderSize?: number;
    receiverColor?: string;
    visitorColor?: string;
    borderColor?: string;
    playerBorderColor?: string;
    playerTextColor?: string;
    showName?: boolean;
    playerRatio?: number;
    borderStyle?: string;
    receiverSystem?: Formation
    visitorSystem?: Formation
    externalSize?: number;
    orientation?: 'lanscape' | 'portrait';
    receivers?: Player[],
    visitors?: Player[]
  }
</script>

<script setup lang="ts">
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

const RATIO: RatioConfig = reactive({
  PENALTY: { LENGTH: 0.16, WIDTH: 0.61 },
  GOAL: { LENGTH: 0.05, WIDTH: 0.28 },
  CIRCLE: { WIDTH: 0.14 },
  PLAYER: { SIZE: 0.15 },
});

const {
  borderSize = 2,
  orientation = 'landscape',
  externalSize = 10,
  playerRatio = 0.15,
  receiverSystem = Formation.S433,
  visitorSystem = Formation.S433,
  playerTextColor = '#ffffff'
} = defineProps<Props>()

const ground = useTemplateRef<HTMLDivElement>('ground')
const client = computed(() =>  ({w:  ground.value?.clientWidth ?? 0, h: ground.value?.clientHeight ?? 0}))



function playerClass(index: number, player: Player, target: Target, formation: Formation) {
  const zone = {w: client.value.w - externalSize * 2 - borderSize * 2, h:client.value.h - externalSize * 2 - borderSize * 2, x:0, y:0};
  const frame = {w:zone.w * playerRatio, h:zone.h * playerRatio, x:0, y:0};
  const offset = {x: frame.w / 2, y: frame.h / 2};
  let style = `width: ${frame.w}px; height: ${frame.h}px;`;

  const position = systems[formation][index];

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
    return style;
  }
}

const  playerComputedName = computed(() => {
  const zone = {w: client.value.w - externalSize * 2 - borderSize * 2, h:client.value.h - externalSize * 2 - borderSize * 2, x:0, y:0};
  const frame = {w:zone.w * playerRatio, h:zone.h * playerRatio, x:0, y:0};
  const number = {w:Math.min(zone.w, zone.h) / 15, h:Math.min(zone.w, zone.h) / 15, x:0, y:0};
  const font = 10 + Math.min(zone.w, zone.h) / 15 / 4;
  return `width: ${frame.w}px; height: ${font}px;color: ${playerTextColor};margin-top: ${number.w / 2 + 4}px;font-size: ${font}px;`;
})
</script>

<script>

import {SYSTEMS} from "../enums/system";
import {ORIENTATION} from "../enums/orientation";


const ZONE = {
  RECEIVER : 'receiver',
  VISITOR : 'visitor',
}

const RATIO = {
  PENALTY : {
    LENGTH: 0.16,
    WIDTH: 0.61,
  },
  GOAL : {
    LENGTH: 0.05,
    WIDTH: 0.28,
  },
  CIRCLE : {
    WIDTH: 0.14,
  },
  PLAYER: {
    SIZE: 0.15,
  }
}

export default {
  name: "vue-soccer-field",
  data() {
    return {
      ground: null,
      frames: {
        player: null,
      },
      systems: SYSTEMS,
      backgroundUrl,
    }
  },
  mounted() {
    this.ground = this.$refs.ground;
  },
  created() {
  },
  computed: {
    client() {
      if(null !== this.ground) {
        return {
          w: this.$refs.ground.clientWidth,
          h: this.$refs.ground.clientHeight
        };
      }
      return {w: 0, h: 0};
    },
  },
  methods: {
    playerNameStyle() {
      const zone = {w:this.client.w - this.externalSize * 2 - this.borderSize * 2, h:this.client.h - this.externalSize * 2 - this.borderSize * 2, x:0, y:0};
      const frame = {w:zone.w * this.playerRatio, h:zone.h * this.playerRatio, x:0, y:0};
      const number = {w:Math.min(zone.w, zone.h) / 15, h:Math.min(zone.w, zone.h) / 15, x:0, y:0};
      const font = 10 + Math.min(zone.w, zone.h) / 15 / 4;
      let style = `width: ${frame.w}px; height: ${font}px;`;
      style += `position: absolute;`;
      style += `top: 50%;`;
      style += `margin-top: ${number.w / 2 + 4}px;`;
      style += `color: ${this.playerTextColor};text-align: bottom;line-height:100%;`;
      style += `z-index: 10;`;
      style += `font-size: ${font}px; font-weight: 400;`;
      return style;
    },
    playerNumberStyle(index, player, target) {
      const zone = {w:this.client.w - this.externalSize * 2 - this.borderSize * 2, h:this.client.h - this.externalSize * 2 - this.borderSize * 2, x:0, y:0};
      const frame = {w:Math.min(zone.w, zone.h) / 15, h:Math.min(zone.w, zone.h) / 15, x:0, y:0};
      const font = 8 + Math.min(zone.w, zone.h) / 15 / 4;
      let style = `width: ${frame.w}px; height: ${frame.h}px;`;
      style += `position: absolute;`;
      style += `top: 50%; left: 50%;`;
      style += `margin-top: -${frame.w / 2}px; margin-left: -${frame.h / 2}px;`;
      switch (target) {
        case ZONE.VISITOR:
          style += `background: ${this.visitorColor}; border: ${this.borderSize}px solid ${this.playerBorderColor};`;
          break;
        default:
          style += `background: ${this.receiverColor}; border: ${this.borderSize}px solid ${this.playerBorderColor};`;
      }
      style += `color: ${this.playerTextColor};text-align: center;line-height:${frame.h}px;`;
      style += `font-size: ${font}px; font-weight: bold;`;
      style += `padding: 0px;`;
      return style;
    },
    zoneStyle(target) {
      return `${this.zoneFrameStyleValue(target)}${this.borderStyleValue()}`;
    },
    penaltyAreaStyle(target) {
      return `${this.penaltyAreaStyleValue(target)}${this.borderStyleValue()}`;
    },
    goalAreaStyle(target) {
      return `${this.goalAreaStyleValue(target)}${this.borderStyleValue()}`;
    },
    circleStyle() {
      return `${this.circleStyleValue()}${this.borderStyleValue()}${this.radiusStyleValue()}`;
    },
    zoneFrameStyleValue(target) {
      const frame = {w:0, h:0, x:0, y:0};
      switch (this.orientation) {
        case ORIENTATION.LANDSCAPE:
          Object.assign(frame, { x: this.externalSize, y: this.externalSize });
          Object.assign(frame, { w: this.client.w / 2 - (this.externalSize + this.borderSize), h: this.client.h - (this.externalSize + this.borderSize) * 2 });
          switch (target) {
            case ZONE.VISITOR:
              return `width:${frame.w}px;height:${frame.h}px;top:${frame.y}px;right:${frame.x}px;`;
            default:
              return `width:${frame.w}px;height:${frame.h}px;top:${frame.y}px;left:${frame.x}px;`;
          }
        default:
          Object.assign(frame, { x: this.externalSize, y: frame.h + this.externalSize })
          Object.assign(frame, { w: this.client.w - (this.externalSize + this.borderSize) * 2, h: this.client.h / 2 - (this.externalSize + this.borderSize) });
          switch (target) {
            case ZONE.VISITOR:
              return `width:${frame.w}px;height:${frame.h}px;bottom:${frame.y}px;left:${frame.x}px;`;
            default:
              return `width:${frame.w}px;height:${frame.h}px;top:${frame.y}px;left:${frame.x}px;`;
          }
      }
    },
    penaltyAreaStyleValue(target) {
      const frame = {w:0, h:0, x:0, y:0};
      const center = {x:this.client.w / 2, y:this.client.h/ 2};
      switch (this.orientation) {
        case ORIENTATION.LANDSCAPE:
          Object.assign(frame, { w: this.client.w * RATIO.PENALTY.LENGTH - this.borderSize, h: this.client.h * RATIO.PENALTY.WIDTH - this.borderSize * 2 });
          switch (target) {
            case ZONE.VISITOR:
              return `width:${frame.w}px;height:${frame.h}px;top:${center.y - frame.h / 2}px;left:${this.externalSize}px;`;
            default:
              return `width:${frame.w}px;height:${frame.h}px;top:${center.y - frame.h / 2}px;right:${this.externalSize}px;`;
          }
        default:
          Object.assign(frame, { w: this.client.w * RATIO.PENALTY.WIDTH - this.borderSize, h: this.client.h * RATIO.PENALTY.LENGTH - this.borderSize * 2 });
          switch (target) {
            case ZONE.VISITOR:
              return `width:${frame.w}px;height:${frame.h}px;top:${this.externalSize}px;left:${center.x - frame.w / 2}px;`;
            default:
              return `width:${frame.w}px;height:${frame.h}px;bottom:${this.externalSize}px;left:${center.x - frame.w / 2}px;`;
          }
      }
    },
    goalAreaStyleValue(target) {
      const frame = {w:0, h:0, x:0, y:0};
      switch (this.orientation) {
        case ORIENTATION.LANDSCAPE:
          Object.assign(frame, { w: this.client.w * RATIO.GOAL.LENGTH - this.borderSize, h: this.client.h * RATIO.GOAL.WIDTH - this.borderSize * 2 });
          const landcapeCenter = { x: (this.client.w * RATIO.PENALTY.LENGTH - this.borderSize) / 2, y: (this.client.h * RATIO.PENALTY.WIDTH - this.borderSize * 2) / 2 };
          switch (target) {
            case ZONE.VISITOR:
              return `width:${frame.w}px;height:${frame.h}px;top:${landcapeCenter.y - frame.h / 2}px;left:${-this.borderSize}px;`;
            default:
              return `width:${frame.w}px;height:${frame.h}px;top:${landcapeCenter.y - frame.h / 2}px;right:${-this.borderSize}px;`;
          }
        default:
          Object.assign(frame, { w: this.client.w * RATIO.GOAL.WIDTH - this.borderSize, h: this.client.h * RATIO.GOAL.LENGTH - this.borderSize * 2 });
          const portraitCenter = { x: (this.client.w * RATIO.PENALTY.WIDTH - this.borderSize) / 2, y: (this.client.h * RATIO.PENALTY.LENGTH - this.borderSize * 2) / 2 };
          switch (target) {
            case ZONE.VISITOR:
              return `width:${frame.w}px;height:${frame.h}px;top:${-this.borderSize}px;left:${portraitCenter.x - frame.w / 2}px;`;
            default:
              return `width:${frame.w}px;height:${frame.h}px;bottom:${-this.borderSize}px;left:${portraitCenter.x - frame.w / 2}px;`;
          }
      }
    },
    circleStyleValue() {
      const frame = {w:0, h:0, x:0, y:0};
      const center = {x:this.client.w / 2, y:this.client.h/ 2};
      Object.assign(frame, { w: Math.min(this.client.w, this.client.h) * RATIO.CIRCLE.WIDTH, h: Math.min(this.client.w, this.client.h) * RATIO.CIRCLE.WIDTH });
      Object.assign(frame, { x: center.x - frame.w / 2 - this.borderSize, y: center.y - frame.h / 2 - this.borderSize});
      return `width:${frame.w}px;height:${frame.h}px;top:${frame.y}px;left:${frame.x}px;`;
    },
    borderStyleValue() {
      return `border: ${this.borderSize}px ${this.borderStyle} ${this.borderColor};`;
    },
    radiusStyleValue() {
      return 'border-radius: 50%;';
    },
  }
};
</script>
<style>

.ground {
  background-color: #238729;
  width: 100%;
  height: 100%;
  position: relative;
}

.zone {
  position: absolute;
}

.penalty-area {
  position: absolute;
}

.goal-area{
  position: absolute;
}

.center-area {
  position: absolute;
}

.player {
  position: absolute;
  font-family: Questrial, sans-serif;
  text-align:center;
  display: inline;
  // background-color: coral;
}

.player-number {
  border-radius: 50%;
  text-align:center;
  display: table;
  margin: 0 auto;
}

.player-name {
  text-align:center;
  // background-color: aquamarine;
}

</style>
