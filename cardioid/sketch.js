function setup() {
  w = $(document).width()
  h = $(document).height()
  console.log({
    w,
    h
  })
  createCanvas(w, h)
}

function draw() {
  background(0)
  noFill()
  stroke(255)

  let n = Math.floor(map(mouseX, 0, width, 10, 1000))
  let l = Math.floor(map(mouseY, 0, height, 2, 50))
  let c = new Cardioid(n, l, (width > height ? height : width) / 2 - 50)
  c.drawCircle()
  c.resetPoints()
  c.drawLines()

  textSize(20)
  textAlign(CENTER);
  text('n=' + n, mouseX, height - 20)
  text('l=' + l, width - 30, mouseY)
}

class Cardioid {
  constructor(n, l, r) {
    this.points = []
    this.n = n
    this.l = l
    this.r = r
  }

  drawCircle() {
    strokeWeight(1)
    stroke(255, 0, 0)
    ellipse(width / 2, height / 2, this.r * 2, this.r * 2)
  }

  resetPoints() {
    this.points = []
    for (let i = 0; i < this.n; i++) {
      let angle = map(i, 0, this.n, 0, TWO_PI)
      let x = this.r * cos(angle)
      let y = this.r * sin(angle)
      this.points.push(new Point(i, width / 2 + x, height / 2 + y))
    }
  }

  drawLines() {
    for (let p of this.points) {
      p.show()
      p.drawLineToPoint(this.points[(p.id * this.l) % this.n])
    }
  }
}

class Point {
  constructor(id, x, y) {
    this.id = id
    this.x = x
    this.y = y
  }

  show() {
    fill(255)
    ellipse(this.x, this.y, 8, 8)
  }

  drawLineToPoint(p) {
    stroke(200)
    strokeWeight(1)
    line(this.x, this.y, p.x, p.y)
  }
}