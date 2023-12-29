export type GridSize = {width: number; height: number};

export type Grid = Array<Array<boolean>>;

export const getGridHeight = (grid: Grid): number => grid.length;

export const getGridWidth = (grid: Grid): number => grid[0].length;
