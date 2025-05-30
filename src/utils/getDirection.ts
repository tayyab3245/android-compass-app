/** Convert heading angle → cardinal direction label */
export function getDirection(angle: number): string {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const idx  = Math.round(angle / 45) % 8;
  return dirs[idx];
}