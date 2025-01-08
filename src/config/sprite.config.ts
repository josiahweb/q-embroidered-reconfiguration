export type spriteConfigItem = {
  position: { x: number; y: number };
  alpha: number;
};

export type spriteConfig = {
  [key: string]: spriteConfigItem;
};

export const scene1Config: spriteConfig = {
  'scene1/images/banderole1.png': { position: { x: 0, y: 1302 }, alpha: 1 },
  'scene1/images/banderole2.png': { position: { x: 0, y: 1340 }, alpha: 1 },
  'scene1/images/banderole3.png': { position: { x: 0, y: 1333 }, alpha: 1 },
  'scene1/images/banderole4.png': { position: { x: 40, y: 1320 }, alpha: 1 },
  'scene1/images/banderole5.png': { position: { x: 164, y: 1320 }, alpha: 1 },
  'scene1/images/banderole6.png': { position: { x: 750, y: 1000 }, alpha: 1 },
  'scene1/images/bg.webp': { position: { x: 0, y: 0 }, alpha: 1 },
  'scene1/images/bottom-mask.png': { position: { x: 0, y: 2472 }, alpha: 1 },
  'scene1/images/f1-petal1.png': { position: { x: 151, y: 516 }, alpha: 0 },
  'scene1/images/f1-petal2.png': { position: { x: 93, y: 651 }, alpha: 0 },
  'scene1/images/f1-petal3.png': { position: { x: 82, y: 826 }, alpha: 0 },
  'scene1/images/f1.png': { position: { x: -145, y: 270 }, alpha: 1 },
  'scene1/images/f2-petal1.png': { position: { x: 153, y: 3150 }, alpha: 0 },
  'scene1/images/f2-petal2.png': { position: { x: 256, y: 3190 }, alpha: 0 },
  'scene1/images/f2.png': { position: { x: -160, y: 2875 }, alpha: 0 },
  'scene1/images/f3.png': { position: { x: 750, y: 3430 }, alpha: 0 },
  'scene1/images/person1.png': { position: { x: -364, y: 1980 }, alpha: 0 },
  'scene1/images/person2.png': { position: { x: 0, y: 3115 }, alpha: 1 },
  'scene1/images/person3.png': { position: { x: 372, y: 3284 }, alpha: 1 },
  'scene1/images/person4.png': { position: { x: 750, y: 2284 }, alpha: 0 },
  'scene1/images/sTitle.png': { position: { x: 572, y: 120 }, alpha: 0 },
  'scene1/images/text.png': { position: { x: 0, y: 900 }, alpha: 0 },
  'scene1/images/title.png': { position: { x: 82, y: 725 }, alpha: 1 },
};
