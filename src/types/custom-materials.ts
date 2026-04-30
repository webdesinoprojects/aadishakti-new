import React from 'react';
import * as THREE from 'three';
import { ShaderMaterial } from 'three';

export interface DistortionMaterialProps {
  ref?: React.Ref<ShaderMaterial>;
  uTexture?: THREE.Texture;
  transparent?: boolean;
  [key: string]: any;
}

export interface StoryMaterialProps {
  ref?: React.Ref<ShaderMaterial>;
  uTex1?: THREE.Texture;
  uTex2?: THREE.Texture;
  uTex3?: THREE.Texture;
  [key: string]: any;
}

export interface HomeStoryMaterialProps {
  ref?: React.Ref<ShaderMaterial>;
  uTex1?: THREE.Texture;
  uTex2?: THREE.Texture;
  uTex3?: THREE.Texture;
  uTex4?: THREE.Texture;
  uTex5?: THREE.Texture;
  uTex6?: THREE.Texture;
  [key: string]: any;
}
