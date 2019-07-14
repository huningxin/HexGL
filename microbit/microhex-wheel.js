function showN () {
  led.plot(0, 0)
  led.plot(4, 0)
  led.plot(0, 1)
  led.plot(1, 1)
  led.plot(4, 1)
  led.plot(0, 2)
  led.plot(2, 2)
  led.plot(4, 2)
  led.plot(0, 3)
  led.plot(3, 3)
  led.plot(4, 3)
  led.plot(0, 4)
  led.plot(4, 4)
}
function upRightArrow () {
  led.plot(1, 0)
  led.plot(2, 0)
  led.plot(3, 0)
  led.plot(4, 0)
  led.plot(3, 1)
  led.plot(4, 1)
  led.plot(2, 2)
  led.plot(4, 2)
  led.plot(1, 3)
  led.plot(4, 3)
  led.plot(0, 4)
}
radio.onReceivedString(function (receivedString) {
  onReceived(receivedString)
})
function upLeftArrow () {
  led.plot(0, 0)
  led.plot(1, 0)
  led.plot(2, 0)
  led.plot(3, 0)
  led.plot(0, 1)
  led.plot(1, 1)
  led.plot(0, 2)
  led.plot(2, 2)
  led.plot(0, 3)
  led.plot(3, 3)
  led.plot(4, 4)
}
function upArrow () {
  led.plot(2, 0)
  led.plot(1, 1)
  led.plot(2, 1)
  led.plot(3, 1)
  led.plot(0, 2)
  led.plot(2, 2)
  led.plot(4, 2)
  led.plot(2, 3)
  led.plot(2, 4)
}
function leftArrow () {
  led.plot(2, 0)
  led.plot(1, 1)
  led.plot(0, 2)
  led.plot(1, 2)
  led.plot(2, 2)
  led.plot(3, 2)
  led.plot(4, 2)
  led.plot(1, 3)
  led.plot(2, 4)
}
function rightArrow () {
  led.plot(2, 0)
  led.plot(3, 1)
  led.plot(0, 2)
  led.plot(1, 2)
  led.plot(2, 2)
  led.plot(3, 2)
  led.plot(4, 2)
  led.plot(3, 3)
  led.plot(2, 4)
}
function clear () {
  for (let xIndex = 0; xIndex <= 4; xIndex++) {
      for (let yIndex = 0; yIndex <= 4; yIndex++) {
          led.unplot(xIndex, yIndex)
      }
  }
}
function onReceived (receveidString: string) {
  gameState = receveidString
  if (gameState == "END") {
      basic.showString("PRESS TO START")
      basic.showIcon(IconNames.House)
  } else {
      led.stopAnimation()
  }
}
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
  receivedString = serial.readUntil(serial.delimiters(Delimiters.NewLine))
  onReceived(receivedString)
})
function drawUI () {
  if (left == 1) {
      clear()
      upLeftArrow()
  } else if (right == 1) {
      clear()
      upRightArrow()
  } else if (forward == 1) {
      clear()
      upArrow()
  } else {
      clear()
      showN()
  }
}
function onButtonPressed () {
  if (gameState != "START") {
      led.stopAnimation()
      serial.writeNumber(8)
      radio.sendNumber(8)
  }
}
input.onButtonPressed(Button.B, function () {
  onButtonPressed()
})
input.onButtonPressed(Button.A, function () {
  onButtonPressed()
})
let controlState = 0
let z = 0
let y = 0
let x = 0
let receivedString = ""
let gameState = ""
let right = 0
let left = 0
let forward = 0
forward = 0
left = 0
right = 0
gameState = "END"
radio.setGroup(55)
basic.showIcon(IconNames.House)
basic.forever(function () {
  if (gameState == "START") {
      x = input.acceleration(Dimension.X)
      y = input.acceleration(Dimension.Y)
      z = input.acceleration(Dimension.Z)
      if (x < -200) {
          left = 1
      } else {
          left = 0
      }
      if (x > 200) {
          right = 1
      } else {
          right = 0
      }
      if (z < -400) {
          forward = 1
      } else {
          forward = 0
      }
      controlState = left + right * 2 + forward * 4
      serial.writeNumber(controlState)
      radio.sendNumber(controlState)
      drawUI()
  }
})
