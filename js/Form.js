class Form {
  constructor() {
    this.titleimg = createImg("../Multiplayer-v4-stage-1-activity-main/assets/title.png", "Game Title")
    this.inputbox = createInput("").attribute("placeholder", "Enter Your Name")
    this.button = createButton("Play")
    this.greeting = createElement("h2")
  }

  setPosition() {
    this.titleimg.position(width / 4 - 300, height / 4 - 250)
    this.inputbox.position(width / 2 - 130, height / 2 - 100)
    this.button.position(width / 2 - 110, height / 2 - 50)
    this.greeting.position(width / 2 - 110, height / 2 - 50)

  }

  setStyle() {
    this.titleimg.class("gameTitle")
    this.inputbox.class("customInput")
    this.button.class("customButton")
    this.greeting.class("greeting")


  }

  hide() {
    this.button.hide()
    this.greeting.hide()
    this.inputbox.hide()
  }

  handleMousePressed() {
    this.button.mousePressed(() => {
      this.inputbox.hide()
      this.button.hide()
      var message = `Hello ${this.inputbox.value()}
<br/>
 wait for another player to join...`
      this.greeting.html(message)

      myplayerCount += 1
      myplayer.updateCount(myplayerCount)

      myplayer.name = this.inputbox.value()
      myplayer.index = myplayerCount
      myplayer.addPlayers()
      myplayer.getDistance()



    })

  }
  display() {
    this.setPosition()
    this.setStyle()
    this.handleMousePressed()

  }

}
