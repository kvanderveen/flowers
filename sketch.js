let flowers

function setup() {
  noStroke()
  angleMode(DEGREES)
  createCanvas(windowWidth, windowHeight)
  flowers = new Flowers(100)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  flowers = new Flowers(100)
}

function draw() {
  background(color('skyblue'))
  flowers.drawFlowers()
}

class Flowers {
  #flowers

  constructor(count = 100) {
    this.count = count
    this.#flowers = this._createFlowers()
  }

  _createFlowers() {
    return [...Array(this.count)].map(() => new Flower())
  }

  drawFlowers() {
    this.#flowers.forEach((flower) => flower.drawFlower())
  }
}

class Flower {
  constructor() {
    this.size = floor(random() * width * 0.02)
    this.minSize = this.size
    this.maxSize = this.size * 10
    this.petalColor = color(random(0, 256), random(0, 256), random(0, 256), 180)
    this.pistilColor = color('yellow')
    this.pistilColor.setAlpha(100)
    this.positionX = random(0, width)
    this.positionY = random(0, height)
    this.isGrowing = true
    this.growthRate = 1.01 + random() * 0.02
    this.petalCount = floor(random() * 13) + 12
  }

  drawFlower() {
    push()
    translate(this.positionX, this.positionY)
    this._drawPetals()
    this._drawPistil()
    pop()
    this._changeSize()
  }

  _drawPetals() {
    fill(this.petalColor)
    for (let i = 0; i < this.petalCount; i++) {
      rect(0, -this.size / 2, this.size * 2, this.size, 0, this.size, this.size, 0)
      rotate(360 / this.petalCount)
    }
  }

  _drawPistil() {
    fill(this.pistilColor)
    ellipse(0, 0, this.size)
  }

  _changeSize() {
    if (this.size > this.maxSize) this.isGrowing = false
    if (this.size < this.minSize) this.isGrowing = true
    if (this.isGrowing) this.size *= this.growthRate
    if (!this.isGrowing) this.size /= this.growthRate
  }
}
