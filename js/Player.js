class Player {
  constructor() {
    this.name = null
    this.index = 0
    this.positionX = 0
    this.positionY = 0
    this.score = 0
    this.rank = 0
    this.life = 180
    this.fuel = 180
  }


  addPlayers() {
    var playernode = "players/player" + this.index

    //index=1 = car 1 index=2 = car 2
    if (this.index === 1) {
      this.positionX = width / 2 - 100
    }
    else {
      this.positionX = width / 2 + 100
    }

    database.ref(playernode).set({
      name: this.name,
      index: this.index,
      positionX: this.positionX,
      positionY: this.positionY,
      score: this.score,
      rank: this.rank,
      life: this.life,
      fuel: this.fuel,
    })




  }

  getCount() {
    var CountInfo = database.ref("playerCount")
    CountInfo.on("value", function (data) {
      myplayerCount = data.val()
    })

  }


  updateCount(count) {
    database.ref("/").update({
      playerCount: count
    })
  }

  getDistance() {
    var playernode = database.ref("players/player" + this.index)
    playernode.on("value", data => {
      var distance = data.val()
      //console.log(distance)
      this.positionX = distance.positionX
      this.positionY = distance.positionY
    })

  }

  updatePlayerInfo() {
    var playernode = "players/player" + this.index
    database.ref(playernode).update({
      name: this.name,
      index: this.index,
      positionX: this.positionX,
      positionY: this.positionY,
      score: this.score,
      life: this.life,
      fuel: this.fuel,
    })


  }

  static getPlayerInfo() {
    var playernode = database.ref("players")
    playernode.on("value", data => {
      allPlayers = data.val()
      //console.log(allPlayers)
    })
  }

  getCarsAtEnd() {
    database.ref("carsAtEnd")
      .on("value", data => {
        this.rank = data.val()

      })


  }

  static UpdateCarsAtEnd(rank) {
    database.ref("/").update({ carsAtEnd: rank })
  }

}
