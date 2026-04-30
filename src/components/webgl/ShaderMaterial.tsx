import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

export const DistortionMaterial = shaderMaterial(
  {
    uTexture: new THREE.Texture(),
    uHover: 0,
    uTime: 0,
    uMouse: new THREE.Vector2(0, 0),
    uDistance: 0,
    uHolographic: 0.0, // 1.0 for about page, 0.0 for homepage
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    uniform float uTime;
    uniform float uHover;
    uniform vec2 uMouse;
    uniform float uHolographic;

    void main() {
      vUv = uv;
      vec3 pos = position;
      
      float dist = distance(uv, uMouse);
      float wave = sin(dist * 10.0 - uTime * 5.0) * 0.1 * uHover;
      
      // subtle constant floating only if holographic
      pos.z += sin(pos.y * 5.0 + uTime) * 0.1 * uHolographic;
      pos.z += wave * exp(-dist * 5.0); 

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment Shader
  `
    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float uHover;
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uDistance;
    uniform float uHolographic;

    void main() {
      vec2 uv = vUv;
      
      // Hover distortion
      float dist = distance(uv, uMouse);
      uv.x += sin(uv.y * 10.0 + uTime) * 0.02 * uHover * exp(-dist * 5.0);
      uv.y += cos(uv.x * 10.0 + uTime) * 0.02 * uHover * exp(-dist * 5.0);

      // Chromatic Aberration based on camera distance 
      float aberration = (clamp(uDistance * 0.002, 0.0, 0.02) + (uHover * 0.01)) * uHolographic;
      float r = texture2D(uTexture, vec2(uv.x + aberration, uv.y)).r;
      float g = texture2D(uTexture, uv).g;
      float b = texture2D(uTexture, vec2(uv.x - aberration, uv.y)).b;
      vec3 texColor = vec3(r, g, b);
      
      // Holographic scanlines
      float scanline = sin(uv.y * 200.0 + uTime * 10.0) * 0.04 * uHolographic;
      texColor += scanline;

      // Darken edges / cinematic look
      vec3 finalColor = mix(texColor.rgb, texColor.rgb * vec3(1.2, 0.9, 0.5), uHover * 0.5);
      
      gl_FragColor = vec4(finalColor, 1.0);
      
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }
  `
);

export const StoryMaterial = shaderMaterial(
  {
    uTex1: new THREE.Texture(),
    uTex2: new THREE.Texture(),
    uTex3: new THREE.Texture(),
    uScroll: 0,
    uTime: 0,
  },
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  `
    varying vec2 vUv;
    uniform sampler2D uTex1;
    uniform sampler2D uTex2;
    uniform sampler2D uTex3;
    uniform float uScroll;
    uniform float uTime;

    void main() {
      vec2 uv = vUv;
      
      float s = clamp(uScroll, 0.0, 2.0);
      float mixVal = fract(s);
      int index = int(floor(s));
      vec4 color = vec4(0.0);
      
      if (index == 0) {
          // 1. Zoom In Fade
          float pr = mixVal;
          vec2 uv1 = (uv - 0.5) * (1.0 + pr * 0.2) + 0.5;
          vec2 uv2 = (uv - 0.5) * (1.0 - (1.0 - pr) * 0.2) + 0.5;
          color = mix(texture2D(uTex1, uv1), texture2D(uTex2, uv2), smoothstep(0.3, 0.7, pr));
      } else if (index == 1) {
          // 2. Smooth Rotation Dissolve
          float pr = mixVal;
          float angle = pr * 0.5;
          float c = cos(angle), s2 = sin(angle);
          mat2 rot1 = mat2(c, -s2, s2, c);
          vec2 uv1 = (uv - 0.5) * rot1 + 0.5;
          
          float angle2 = -(1.0 - pr) * 0.5;
          float c2 = cos(angle2), s3 = sin(angle2);
          mat2 rot2 = mat2(c2, -s3, s3, c2);
          vec2 uv2 = (uv - 0.5) * rot2 + 0.5;
          
          color = mix(texture2D(uTex2, uv1), texture2D(uTex3, uv2), smoothstep(0.3, 0.7, pr));
      } else {
          color = texture2D(uTex3, uv);
      }
      
      // Cinematic darkening for extreme text contrast
      color.rgb *= vec3(0.2, 0.2, 0.2);
      
      gl_FragColor = color;
      
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }
  `
);

export const HomeStoryMaterial = shaderMaterial(
  {
    uTex1: new THREE.Texture(),
    uTex2: new THREE.Texture(),
    uTex3: new THREE.Texture(),
    uTex4: new THREE.Texture(),
    uTex5: new THREE.Texture(),
    uTex6: new THREE.Texture(),
    uScroll: 0,
    uTime: 0,
  },
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  `
    varying vec2 vUv;
    uniform sampler2D uTex1;
    uniform sampler2D uTex2;
    uniform sampler2D uTex3;
    uniform sampler2D uTex4;
    uniform sampler2D uTex5;
    uniform sampler2D uTex6;
    uniform float uScroll;
    uniform float uTime;

    void main() {
      vec2 uv = vUv;
      
      float s = clamp(uScroll, 0.0, 5.0);
      float mixVal = fract(s);
      int index = int(floor(s));
      vec4 color = vec4(0.0);

      if (index == 0) {
          // 1. Zoom In
          float pr = mixVal;
          vec2 uv1 = (uv - 0.5) * (1.0 + pr * 0.2) + 0.5;
          vec2 uv2 = (uv - 0.5) * (1.0 - (1.0 - pr) * 0.2) + 0.5;
          color = mix(texture2D(uTex1, uv1), texture2D(uTex2, uv2), smoothstep(0.3, 0.7, pr));
      } 
      else if (index == 1) {
          // 2. Smooth Rotation Dissolve
          float pr = mixVal;
          float angle = pr * 0.5;
          float c = cos(angle), s2 = sin(angle);
          mat2 rot1 = mat2(c, -s2, s2, c);
          vec2 uv1 = (uv - 0.5) * rot1 + 0.5;
          
          float angle2 = -(1.0 - pr) * 0.5;
          float c2 = cos(angle2), s3 = sin(angle2);
          mat2 rot2 = mat2(c2, -s3, s3, c2);
          vec2 uv2 = (uv - 0.5) * rot2 + 0.5;
          
          color = mix(texture2D(uTex2, uv1), texture2D(uTex3, uv2), smoothstep(0.3, 0.7, pr));
      } 
      else if (index == 2) {
          // 3. Parallax Vertical Slide
          float pr = mixVal;
          vec2 uv1 = uv + vec2(0.0, pr * 0.3);
          vec2 uv2 = uv - vec2(0.0, (1.0 - pr) * 0.3);
          color = mix(texture2D(uTex3, uv1), texture2D(uTex4, uv2), smoothstep(0.3, 0.7, pr));
      } 
      else if (index == 3) {
          // 4. Zoom Out
          float pr = mixVal;
          vec2 uv1 = (uv - 0.5) * (1.0 - pr * 0.2) + 0.5;
          vec2 uv2 = (uv - 0.5) * (1.0 + (1.0 - pr) * 0.2) + 0.5;
          color = mix(texture2D(uTex4, uv1), texture2D(uTex5, uv2), smoothstep(0.3, 0.7, pr));
      } 
      else if (index == 4) {
          // 5. Elegant Horizontal Push
          float pr = mixVal;
          vec2 uv1 = uv + vec2(pr * 0.2, 0.0);
          vec2 uv2 = uv - vec2((1.0 - pr) * 0.2, 0.0);
          color = mix(texture2D(uTex5, uv1), texture2D(uTex6, uv2), smoothstep(0.3, 0.7, pr));
      } 
      else {
          color = texture2D(uTex6, uv);
      }
      
      // Cinematic darkening for extreme text contrast
      color.rgb *= vec3(0.2, 0.2, 0.2);
      
      gl_FragColor = color;
      
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }
  `
);

// Augment TypeScript definitions to allow custom materials in JSX
import { Object3DNode } from "@react-three/fiber";

declare module "@react-three/fiber" {
  interface IntrinsicElements {
    distortionMaterial: any;
    storyMaterial: any;
    homeStoryMaterial: any;
  }
}
