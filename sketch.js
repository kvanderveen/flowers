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
  constructor(count = 100) {
    this.count = count
    this.flowers = this.createFlowers()
  }

  createFlowers() {
    return [...Array(this.count)].map(() => new Flower())
  }

  drawFlowers() {
    this.flowers.forEach((flower) => flower.drawFlower())
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
    this.growthRate = 1 + random() * 0.03
  }

  drawFlower() {
    push()
    translate(this.positionX, this.positionY)
    this.drawPetals()
    this.drawPistil()
    pop()
    this.changeSize()
  }

  drawPetals() {
    fill(this.petalColor)
    for (let i = 0; i < 12; i++) {
      rect(0, -this.size / 2, this.size * 2, this.size, 0, this.size, this.size, 0)
      rotate(30)
    }
  }

  drawPistil() {
    fill(this.pistilColor)
    ellipse(0, 0, this.size)
  }

  changeSize() {
    if (this.size > this.maxSize) this.isGrowing = false
    if (this.size < this.minSize) this.isGrowing = true
    if (this.isGrowing) this.size *= this.growthRate
    if (!this.isGrowing) this.size /= this.growthRate
  }
}
