import {
  Entity,
  EntityManager,
} from '@invictus/engine';
import { GridPositionAttribute, GridInputBehavior } from '@invictus/engine/components/grid';
import { TileAttribute } from '@invictus/engine/components/tile';



export default function colonistFactory(entityManager: EntityManager): Entity {
  return entityManager.createEntity([
    [TileAttribute, {
      tileset: 'tileset',
      tileName: 'smile',
      layer: 1,
      colorReplacements: [
        [[255, 255, 255], [231, 121, 129]],
        [[0, 0, 0], [231 - 50, 121 - 100, 129 - 100]],
      ],
      rotation: 0,
    }],
    [GridPositionAttribute, { x: 1, y: 1 }],
  ], [GridInputBehavior]);
}
