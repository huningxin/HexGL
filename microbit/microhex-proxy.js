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
function drawUI () {
  if (controlState & 1) {
      clear()
      upLeftArrow()
  } else if (controlState & 2) {
      clear()
      upRightArrow()
  } else if (controlState & 4) {
      clear()
      upArrow()
  } else {
      clear()
      showN()
  }
}
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
  receivedString = serial.readUntil(serial.delimiters(Delimiters.NewLine))
  radio.sendString(receivedString)
  onReceived(receivedString)
})
function clear () {
  for (let xIndex = 0; xIndex <= 4; xIndex++) {
      for (let yIndex = 0; yIndex <= 4; yIndex++) {
          led.unplot(xIndex, yIndex)
      }
  }
}
radio.onReceivedNumber(function (receivedNumber) {
  serial.writeNumber(receivedNumber)
  controlState = receivedNumber
  if (gameState == "START") {
      drawUI()
  }
})
function onReceived (receveidString: string) {
  gameState = receveidString
  if (gameState == "END") {
      basic.showIcon(IconNames.Pitchfork)
  } else {
      led.stopAnimation()
  }
}
let receivedString = ""
let gameState = ""
let controlState = 0
controlState = 0
gameState = "END"
radio.setGroup(55)
basic.showIcon(IconNames.Pitchfork)
