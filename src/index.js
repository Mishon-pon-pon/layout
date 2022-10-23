const CANVAS_WIDTH = 551;
const CANVAS_HEIGHT = 321;
class Line {
  constructor(sx, sy, ex, ey, ctx) {
    this.sx = sx;
    this.sy = sy;
    this.ex = ex;
    this.ey = ey;
    this.ctx = ctx;
    this.color = "#df4c6f";
  }

  setStartCircle(Fig) {
    new Fig(this.sx, this.sy, this.ctx).draw();
  }

  setStartArrow(Fig, direction) {
    new Fig(this.sx, this.sy, direction, this.ctx).draw();
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.sx, this.sy);
    this.ctx.setLineDash([6, 2]);
    this.ctx.strokeStyle = this.color;
    this.ctx.lineTo(this.ex, this.ey);
    this.ctx.stroke();
  }
}

class Circle {
  constructor(x, y, ctx) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.color = "#df4c6f";
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 4, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }
}

class Triangle {
  constructor(x, y, direction, ctx) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.direction = direction;
  }
  draw() {
    const m = 4;
    this.ctx.beginPath();
    this.ctx.fillStyle = "#df4c6f";
    switch (this.direction) {
      case "top":
        this.ctx.moveTo(this.x, this.y - m);
        this.ctx.lineTo(this.x - m, this.y + m);
        this.ctx.lineTo(this.x + m, this.y + m);
        this.ctx.lineTo(this.x, this.y - m);
        break;
      case "right":
        this.ctx.moveTo(this.x + m, this.y);
        this.ctx.lineTo(this.x - m, this.y - m);
        this.ctx.lineTo(this.x - m, this.y + m);
        this.ctx.lineTo(this.x + m, this.y);
        break;
      case "bottom":
        this.ctx.moveTo(this.x, this.y + m);
        this.ctx.lineTo(this.x - m, this.y - m);
        this.ctx.lineTo(this.x + m, this.y - m);
        this.ctx.lineTo(this.x, this.y + m);
        break;
      case "left":
        this.ctx.moveTo(this.x - m, this.y);
        this.ctx.lineTo(this.x + m, this.y - m);
        this.ctx.lineTo(this.x + m, this.y + m);
        this.ctx.lineTo(this.x - m, this.y);
        break;
    }
    this.ctx.fill();
  }
}

class Text {
  constructor(x, y, text, ctx) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.text = text;
  }
  draw(direction, color) {
    this.ctx.beginPath();
    this.ctx.font = "15px serif";
    if (color) {
      this.ctx.fillStyle = "black";
    } else {
      this.ctx.fillStyle = "#df4c6f";
    }
    switch (direction) {
      case "top":
        this.ctx.fillText(
          this.text,
          this.x - this.ctx.measureText(this.text).width / 2,
          this.y + 10
        );
        break;
      case "bottom":
        this.ctx.fillText(
          this.text,
          this.x - this.ctx.measureText(this.text).width / 2,
          this.y - 2
        );
        break;
      case "left":
        this.ctx.fillText(this.text, this.x + 2, this.y + 3);
        break;
      case "right":
        this.ctx.fillText(
          this.text,
          this.x - this.ctx.measureText(this.text).width - 2,
          this.y + 3
        );
        break;
    }
  }
}

CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  this.beginPath();
  this.moveTo(x + r, y);
  this.arcTo(x + w, y, x + w, y + h, r);
  this.arcTo(x + w, y + h, x, y + h, r);
  this.arcTo(x, y + h, x, y, r);
  this.arcTo(x, y, x + w, y, r);
  this.closePath();
  return this;
};

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

/**BACKGROUND */
ctx.fillStyle = "#f9ebc7";
ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

/**CROSS START */
const crossStart = new Line(CANVAS_WIDTH * 0.4, 4, CANVAS_WIDTH * 0.4, 44, ctx);
crossStart.draw();
crossStart.setStartCircle(Circle);
const crossStartText = new Text(CANVAS_WIDTH * 0.4, 44, "cross start", ctx);
crossStartText.draw("top");

/**CROSS END */
const crrossEnd = new Line(
  CANVAS_WIDTH * 0.4,
  CANVAS_HEIGHT - 4,
  CANVAS_WIDTH * 0.4,
  CANVAS_HEIGHT - 44,
  ctx
);
crrossEnd.draw();
crrossEnd.setStartCircle(Circle);
const crossEndText = new Text(
  CANVAS_WIDTH * 0.4,
  CANVAS_HEIGHT - 44,
  "cross end",
  ctx
);
crossEndText.draw("bottom");

/**MAIN START */
const mainStart = new Line(
  4,
  CANVAS_HEIGHT * 0.75,
  44,
  CANVAS_HEIGHT * 0.75,
  ctx
);
mainStart.draw();
mainStart.setStartCircle(Circle);
const mainStartText = new Text(44, CANVAS_HEIGHT * 0.75, "main start", ctx);
mainStartText.draw("left");

/**MAIN END */
const mainEnd = new Line(
  CANVAS_WIDTH - 4,
  CANVAS_HEIGHT * 0.75,
  CANVAS_WIDTH - 44,
  CANVAS_HEIGHT * 0.75,
  ctx
);
mainEnd.draw();
mainEnd.setStartCircle(Circle);
const mainEndText = new Text(
  CANVAS_WIDTH - 44,
  CANVAS_HEIGHT * 0.75,
  "main end",
  ctx
).draw("right");

/**MAIN AXIS LEFT */
const mainAxisLeft = new Line(
  4,
  CANVAS_HEIGHT * 0.25,
  CANVAS_WIDTH * 0.15,
  CANVAS_HEIGHT * 0.25,
  ctx
);
mainAxisLeft.setStartArrow(Triangle, "left");
mainAxisLeft.draw();
const mainAxisLeftText = new Text(
  CANVAS_WIDTH * 0.15,
  CANVAS_HEIGHT * 0.25,
  "main axis",
  ctx
).draw("left");

/**MAIN AXIS RIGHT */
const mainAxisRight = new Line(
  CANVAS_WIDTH - 4,
  CANVAS_HEIGHT * 0.25,
  CANVAS_WIDTH * 0.267,
  CANVAS_HEIGHT * 0.25,
  ctx
);

mainAxisRight.draw();
mainAxisRight.setStartArrow(Triangle, "right");

/**CROSS AXIS TOP */
const crossAxisTop = new Line(
  CANVAS_WIDTH * 0.68,
  4,
  CANVAS_WIDTH * 0.68,
  CANVAS_HEIGHT * 0.135,
  ctx
);

crossAxisTop.draw();
crossAxisTop.setStartArrow(Triangle, "top");

const crossAxisTopText = new Text(
  CANVAS_WIDTH * 0.68,
  CANVAS_HEIGHT * 0.135,
  "cross axis",
  ctx
).draw("top");

/**CROSS AXIS BOTTOM */
const crossAxisBottom = new Line(
  CANVAS_WIDTH * 0.68,
  CANVAS_HEIGHT - 4,
  CANVAS_WIDTH * 0.68,
  CANVAS_HEIGHT * 0.18,
  ctx
);
crossAxisBottom.draw();
crossAxisBottom.setStartArrow(Triangle, "bottom");

class Rect {
  constructor(x, y, ctx) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = "#cde9fe";
    this.ctx.shadowColor = "gray";
    this.ctx.shadowBlur = 3;
    this.ctx.shadowOffsetX = 3;
    this.ctx.shadowOffsetY = 3;
    this.ctx
      .roundRect(
        this.x - CANVAS_HEIGHT * 0.2,
        this.y - CANVAS_HEIGHT * 0.2,
        CANVAS_HEIGHT * 0.4,
        CANVAS_HEIGHT * 0.4,
        5
      )
      .fill();
    this.ctx.shadowColor = null;
    this.ctx.shadowBlur = null;
    this.ctx.shadowOffsetX = null;
    this.ctx.shadowOffsetY = null;
  }
}

/**RECT 1 */
const rect1 = new Rect(CANVAS_WIDTH * 0.15, CANVAS_HEIGHT * 0.5, ctx).draw();
const flexItemText1 = new Text(
  CANVAS_WIDTH * 0.06,
  CANVAS_HEIGHT * 0.4,
  "flex item",
  ctx
).draw("left", "black");

/**RECT 2 */
const rect2 = new Rect(CANVAS_WIDTH * 0.5, CANVAS_HEIGHT * 0.5, ctx).draw();
const flexItemText2 = new Text(
  CANVAS_WIDTH * 0.41,
  CANVAS_HEIGHT * 0.4,
  "flex item",
  ctx
).draw("left", "black");
const rect1LeftLine = new Line(
  CANVAS_WIDTH * 0.39,
  CANVAS_HEIGHT * 0.55,
  CANVAS_WIDTH * 0.44,
  CANVAS_HEIGHT * 0.55,
  ctx
);
rect1LeftLine.draw();
rect1LeftLine.setStartArrow(Triangle, "left");
const rect1LeftLineText = new Text(
  CANVAS_WIDTH * 0.44,
  CANVAS_HEIGHT * 0.55,
  "main size",
  ctx
).draw("left");
const rect1RightLine = new Line(
  CANVAS_WIDTH * 0.61,
  CANVAS_HEIGHT * 0.55,
  CANVAS_WIDTH * 0.555,
  CANVAS_HEIGHT * 0.55,
  ctx
);
rect1RightLine.draw();
rect1RightLine.setStartArrow(Triangle, "right");
/**RECT 3 */
const rect3 = new Rect(CANVAS_WIDTH * 0.85, CANVAS_HEIGHT * 0.5, ctx).draw();
const flexItemText3 = new Text(
  CANVAS_WIDTH * 0.76,
  CANVAS_HEIGHT * 0.4,
  "flex item",
  ctx
).draw("left", "black");

const rect3LineTop = new Line(
  CANVAS_WIDTH * 0.9,
  CANVAS_HEIGHT * 0.31,
  CANVAS_WIDTH * 0.9,
  CANVAS_HEIGHT * 0.49,
  ctx
);

rect3LineTop.draw();
rect3LineTop.setStartArrow(Triangle, "top");

const rect3LineBottom = new Line(
  CANVAS_WIDTH * 0.9,
  CANVAS_HEIGHT * 0.69,
  CANVAS_WIDTH * 0.9,
  CANVAS_HEIGHT * 0.55,
  ctx
);
rect3LineBottom.draw();
rect3LineBottom.setStartArrow(Triangle, "bottom");
const rect3Tet = new Text(
  CANVAS_WIDTH * 0.9,
  CANVAS_HEIGHT * 0.54,
  "cross size",
  ctx
).draw("bottom");
