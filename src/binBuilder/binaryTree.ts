import { InfiniteCanvasRenderingContext2D } from "ef-infinite-canvas/dist/types/infinite-context/infinite-canvas-rendering-context-2d";

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

  draw(c: InfiniteCanvasRenderingContext2D) {
    const { x, y } = this.position;

    c.lineWidth = 3;
    c.beginPath();
    c.arc(x, y, this.RADIUS, 0, Math.PI * 2, true);
    c.stroke();

    // c.fillStyle = "#D5F5E3"
    // c.strokeStyle = "#D5F5E3"

    c.beginPath();
    c.arc(
      x - this.RADIUS,
      y + this.RADIUS,
      this.ADD_RADIUS,
      0,
      Math.PI * 2,
      true
    );
    c.stroke();
    // c.fill()

    c.beginPath();
    c.arc(
      x + this.RADIUS,
      y + this.RADIUS,
      this.ADD_RADIUS,
      0,
      Math.PI * 2,
      true
    );
    c.stroke();
    // c.fill()

    c.font = "16px Tahoma";
    c.fillStyle = "black";
    c.textAlign = "center";
    c.fillText(this.value, x, y + 4);
  }

  drawLine(c: InfiniteCanvasRenderingContext2D, parentNode: TreeNode) {
    if (parentNode) {
      const parentPosition = parentNode.position;
      const sign = this.i % 2 == 0 ? 1 : -1;
      c.beginPath();
      c.moveTo(
        parentPosition.x + sign * this.RADIUS + sign * this.ADD_RADIUS,
        parentPosition.y + this.RADIUS + this.ADD_RADIUS
      );
      c.lineTo(
        this.position.x - sign * this.RADIUS,
        this.position.y - this.RADIUS
      );
      c.stroke();
    }
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
