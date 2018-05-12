import Component from '@invictus/engine/core/component';
import { ColorReplaceFilter } from 'pixi-filters';


/*
import EntityAttribute from '@invictus/engine/core/entityAttribute';
import EntityBehavior from '@invictus/engine/core/entityBehavior';


export interface ITile {
  tileset: string,
  tileName: string;
  colorReplacements: any;
  rotation: number;
  layer: number;
}

export class TileAttribute extends EntityAttribute<ITile> {
  filters: ColorReplaceFilter[];

  onChange(value) {
    if (value.rotation === undefined) {
      value.rotation = 0;
    }
    if (value.layer === undefined) {
      value.layer = 0;
    }
    if (value.colorReplacements) {
      this.filters = [];
      for (const color of value.colorReplacements) {
        const before = color[0].map(c => c / 255);
        const after = color[1].map(c => c / 255);
        const filter = new ColorReplaceFilter(before, after, .1);
        filter.resolution = window.devicePixelRatio;
        this.filters.push(filter);
      }
    }
    return value;
  }
}
*/

export interface ITileComponent {
  tileset: string,
  tileName: string;
  colorReplacements: any;
  rotation: number;
  layer: number;
}
export class TileComponent extends Component<ITileComponent> {
  filters: ColorReplaceFilter[];

  onChange() {
    this.filters = [];
    for (const color of this.get('colorReplacements')) {
      const before = color[0].map(c => c / 255);
      const after = color[1].map(c => c / 255);
      const filter = new ColorReplaceFilter(before, after, .1);
      filter.resolution = window.devicePixelRatio;
      this.filters.push(filter);
    }
  }
}
