const isInsideCircle = (
  x: number,
  y: number,
  centerX: number,
  centerY: number,
  radius: number
) => {
  return (
    Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2) < Math.pow(radius, 2)
  );
};

export class TreeNode {
  RADIUS = 30;
  ADD_RADIUS = 10;

  i: number;
  level: number;
  value: string;
  position: { x: number; y: number };

  constructor(
    i: number,
    level: number,
    value: string,
    position: { x: number; y: number }
  ) {
    this.i = i;
    this.level = level;
    this.value = value;
    this.position = position;
  }

  isInside(x: number, y: number) {
    return isInsideCircle(x, y, this.position.x, this.position.y, this.RADIUS);
  }

  isInsideLeftButton(x: number, y: number) {
    return isInsideCircle(
      x,
      y,
      this.position.x - this.RADIUS,
      this.position.y + this.RADIUS,
      this.ADD_RADIUS
    );
  }

  isInsideRightButton(x: number, y: number) {
    return isInsideCircle(
      x,
      y,
      this.position.x + this.RADIUS,
      this.position.y + this.RADIUS,
      this.ADD_RADIUS
    );
  }
}
