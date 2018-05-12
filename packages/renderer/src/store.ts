import * as Immutable from 'immutable';
import { Point } from 'pixi.js';
import { createStore, Store } from 'redux';
import { CellFactory, ICellRecord } from './records/cell';
import { EntityFactory, IEntityRecord } from './records/entity';

import { UIEvents } from "@invictus/engine/core/game";
import EventEmitter from "@invictus/engine/utils/eventEmitter";


export interface IUIState {
  hoveredCell: Point | null;
  selectedCells: Immutable.Set<ICellRecord>;
  entitiesMap: Immutable.Map<ICellRecord, Immutable.Set<IEntityRecord>>;
}

const defaultState: IUIState = {
  hoveredCell: null,
  selectedCells: Immutable.Set([]),
  entitiesMap: Immutable.Map([]),
};

const mapEntitiesToSet = (entities) => Immutable.Set.of(
  ...entities.map((entity) => EntityFactory(entity)),
);

function rootReducer(state: IUIState = defaultState, action): IUIState {
  switch (action.type) {
    case 'CELL_HOVERED':
      return { ...state, hoveredCell: action.payload };
    case 'CELL_SELECTED': {
      const cell = CellFactory(action.payload.coord);
      const entitySet = mapEntitiesToSet(action.payload.entities);

      return {
        ...state,
        selectedCells: state.selectedCells.add(cell),
        entitiesMap: state.entitiesMap.set(cell, entitySet),
      };
    }
    case 'CELL_UNSELECTED': {
      const cell = CellFactory(action.payload.coord);
      return {
        ...state,
        selectedCells: state.selectedCells.remove(cell),
      };
    }
    default:
      return state;
  }
}

function configureStore(initialState: IUIState = defaultState): Store<IUIState> {
  return createStore(rootReducer, initialState);
}

const store: Store<IUIState> = configureStore();

export function connectStore(events: EventEmitter<UIEvents>) {
  events.on(UIEvents.CELL_HOVERED, (coord: Point) => {
    store.dispatch({ type: 'CELL_HOVERED', payload: coord });
  });
  events.on(UIEvents.CELL_SELECTED, (data) => {
    store.dispatch({ type: 'CELL_SELECTED', payload: data });
  });
  events.on(UIEvents.CELL_UNSELECTED, (data) => {
    store.dispatch({ type: 'CELL_UNSELECTED', payload: data });
  });
}

export default store;
