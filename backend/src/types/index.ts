export type Line = {
  waiting: number;
  elapsed: number;
}

export type Office = {
  id: number;
  name: string;
  online: boolean;
  lines: Line[];
}
