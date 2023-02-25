setInterval(setClock, 1000)

const hourHand = document.querySelector(".hour")
const minutesHand = document.querySelector(".minut")
const secondsHand = document.querySelector(".second")

setClock()

function setClock() {
  const curentDate = new Date()
  const secondsRasio = curentDate.getSeconds() / 60
  const minutesRasio = (secondsRasio + curentDate.getMinutes()) / 60
  const hoursRasio = (minutesRasio + curentDate.getHours()) / 12

  seRotation(secondsHand, secondsRasio)
  seRotation(minutesHand, minutesRasio)
  seRotation(hourHand, hoursRasio)
}

function seRotation(element, rotationRation) {
  element.style.setProperty("--rotation", rotationRation * 360)
}
