class Game {
  constructor() {
    this.resetButton = createButton("")
    this.resetTitle = createElement("h2")

    this.leaderBoardTitle = createElement("h2")
    this.leader1 = createElement("h2")
    this.leader2 = createElement("h2")

    this.playersMoving = false
    this.leftKey = false
  }

  getState() {
    var stateInfo = database.ref("gameState")
    stateInfo.on("value", function (data) {
      myGamestate = data.val()
    })

  }


  updateState(state) {
    database.ref("/").update({
      gameState: state
    })
  }


  // GAMESTATE=1
  start() {
    myform = new Form()
    myform.display()
    myplayer = new Player
    myplayer.getCount()


    car1 = createSprite(width / 2 - 100, height - 100)
    car1.addImage("car1", car1Image)
    car1.scale = 0.06

    car2 = createSprite(width / 2 + 100, height - 100)
    car2.addImage("car12", car2Image)
    car2.scale = 0.06

    cars = [car1, car2]

    fuelGroup = new Group()
    coinsGroup = new Group()
    obstacle1 = new Group()
    obstacle2 = new Group()

    this.addSprites(fuelGroup, 30, fuelImage, 0.02)
    this.addSprites(coinsGroup, 20, coinsImage, 0.06)
    this.addSprites(obstacle1, 20, obstacle1Image, 0.03)
    this.addSprites(obstacle2, 20, obstacle2Image, 0.03)
  }

  addSprites(spriteGroup, numberOfSprites, spriteImage, scale) {
    for (var i = 0; i < numberOfSprites; i += 1) {
      var x, y
      x = random(width / 2 + 150, width / 2 - 50)
      y = random(-height * 5, height - 400)

      var sprite = createSprite(x, y)
      sprite.addImage("sprite", spriteImage)
      sprite.scale = scale
      spriteGroup.add(sprite)

    }

  }

  // GAMESTATE=2
  play() {
    myform.hide()
    myform.titleimg.position(40, 60)
    myform.titleimg.class("gameTitle2")


    this.resetTitle.html("Reset Game")
    this.resetTitle.class("resetText")
    this.resetTitle.position(width / 2 + 420, 30)
    this.resetButton.position(width / 2 + 420, 110)
    this.resetButton.class("resetButton")

    this.handleResetButton()


    Player.getPlayerInfo()
    myplayer.getCarsAtEnd()

    this.leaderBoardTitle.html("Leader Board")
    this.leaderBoardTitle.class("resetText")
    this.leaderBoardTitle.position(width / 3 - 60, 40)

    this.leader1.class("leadersText")
    this.leader2.class("leadersText")

    this.leader1.position(width / 3 - 50, 80)
    this.leader2.position(width / 3 - 50, 130)

    if (allPlayers !== undefined) {
      image(track, 0, -height * 5, width, height * 6)
      this.showLifeBar()
      this.showFuelBar()
      this.showleaderBoard()

      // index of the player
      var index = 0
      // here i is individial player in allPlayers array
      for (var i in allPlayers) {
        // add 1 to the index for every loop
        index = index + 1


        // fetch the x and y position of the car from firebase
        var x = allPlayers[i].positionX
        var y = height - allPlayers[i].positionY

        //   // console.log(x,y)

        cars[index - 1].position.x = x
        cars[index - 1].position.y = y

        camera.position.y = cars[index - 1].position.y

        //camera.position.x = cars[index - 1].position.x

        // checking which car in active in window and bellow that displaying a circle
        if (index === myplayer.index) {
          stroke("red")
          strokeWeight(3)
          fill("black")
          ellipse(x, y, 70, 70)

          this.destroyFuel(index)
          this.destroyCoins(index)
          this.handleCollision(index)
        }
      }


    }


    this.movePlayers()
    drawSprites()


    const finishLine = height * 6 - 100

    if (myplayer.positionY > finishLine) {
      myGamestate = 2
      myplayer.rank += 1
      Player.UpdateCarsAtEnd(myplayer.rank)
      myplayer.updatePlayerInfo()

    }

  }
  movePlayers() {
    if (keyIsDown(UP_ARROW)) {
      myplayer.positionY += 10
      myplayer.updatePlayerInfo()
      this.playersMoving = true

    }
    if (keyIsDown(LEFT_ARROW) && myplayer.positionX > width / 3 - 50) {
      myplayer.positionX -= 10
      myplayer.updatePlayerInfo()
      this.playersMoving = true
      this.leftKey = true

    }

    if (keyIsDown(RIGHT_ARROW) && myplayer.positionX < width / 2 + 300) {
      myplayer.positionX += 10
      myplayer.updatePlayerInfo()
      this.playersMoving = true
      this.leftKey = false
    }
  }


  destroyFuel(index) {
    cars[index - 1].overlap(fuelGroup, function (collector, collected) {
      collected.remove()
      if(myplayer.fuel<=180){
        myplayer.fuel+=20

      }
      myplayer.updatePlayerInfo()
      if(myplayer.fuel<0&&this.playersMoving==true){
        myplayer.fuel-=0.3

      }

    })



  }

  destroyCoins(index) {
    cars[index - 1].overlap(coinsGroup, function (collector, collected) {
      myplayer.score += 10
      myplayer.updatePlayerInfo()
      collected.remove()
    })
  }

  // GAMESTATE=3
  end() {


  }

  handleResetButton() {
    this.resetButton.mousePressed(() => {
      database.ref("/").update({
        gameState: 0,
        playerCount: 0,
        players: {},
        carsAtEnd: 0

      })
      window.location.reload()
    })

  }


  showleaderBoard() {
    var leader1, leader2
    var players = Object.values(allPlayers)
    //console.log(players)
    if ((players[0].rank === 0 && players[1].rank === 0) || players[0].rank === 1) {
      // &emsp
      leader1 = players[0].rank + "&emsp;" + players[0].name + "&emsp;" + players[0].score
      leader2 = players[1].rank + "&emsp;" + players[1].name + "&emsp;" + players[1].score

      if (players[1].rank === 1) {
        leader1 = players[1].rank + "&emsp;" + players[1].name + "&emsp;" + players[1].score
        leader2 = players[0].rank + "&emsp;" + players[0].name + "&emsp;" + players[0].score
      }


    }
    this.leader1.html(leader1)
    this.leader2.html(leader2)

  }


  showLifeBar() {
    push()
    image(lifeImage, width / 2 - 130, height - myplayer.positionY - 100, 20, 20)
    fill("white")
    rect(width / 2 - 100, height - myplayer.positionY - 100, 180, 20)
    fill("yellow")
    rect(width / 2 - 100, height - myplayer.positionY - 100, myplayer.life, 20)
    pop()

  }

  showFuelBar() {
    push()
    image(fuelImage, width / 2 - 130, height - myplayer.positionY - 150, 20, 20)
    fill("white")
    rect(width / 2 - 100, height - myplayer.positionY - 150, 180, 20)
    fill("orange")
    rect(width / 2 - 100, height - myplayer.positionY - 150, myplayer.fuel, 20)
    pop()

  }

  handleCollision(index) {
    if (cars[index - 1].collide(obstacle1) || cars[index - 1].collide(obstacle2)) {
      if (myplayer.life > 0 && this.playersMoving === true) {
        myplayer.life -= 180 / 4
        console.log("colided")

      }

      if (cars[index - 1].collide(obstacle1) || cars[index - 1].collide(obstacle2)) {
        if (myplayer.fuel > 0 && this.playersMoving === true) {
          myplayer.fuel -= 180 / 4
          console.log("colided")
  
        }
      }

      if(this.leftKey===true){
        myplayer.positionX+=100

      }
      else{
        myplayer.positionX-=100
      }
      myplayer.updatePlayerInfo()

    }
  }
}
