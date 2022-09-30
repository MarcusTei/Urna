let voteNumber = "";
let photo = document.getElementById("candidatePhoto");
let name = document.getElementById("candidateName");
let firstNumber = document.getElementById("firstNumber");
let secondNumber = document.getElementById("secondNumber");
let mainImg = document.getElementById("mainImg");

async function jsonResponse(link) {
  let response = await fetch(link);
  return await response.json();
}

async function digitNumber(event) {
  mainImg.style.display = "none";
  console.log(event);
  const num = event.target.textContent;

  if (firstNumber.value == "") {
    firstNumber.value = num;
  } else if (firstNumber.value != "" && secondNumber.value == "") {
    secondNumber.value = num;
    voteNumber = firstNumber.value + secondNumber.value;

    response = await jsonResponse("https://api-urna.herokuapp.com/candidatos");
    console.log(response);

    for (let i = 0; i < response.candidatos.length; i++) {
      if (response.candidatos[i].numero == Number(voteNumber)) {
        const candidatePhoto = response.candidatos[i].foto;
        photo.src = candidatePhoto;
        photo.style.display = "block";

        const candidateName = response.candidatos[i].nome;
        name.textContent = `Nome: ${candidateName}`;
        name.style.display = "block";
        break;
      } else {
        continue;
      }
    }
  }
}

function deleteNumber() {
  if (firstNumber.value != "" && secondNumber.value != "") {
    secondNumber.value = "";
    photo.style.display = "none";
    name.style.display = "none";
  } else if (firstNumber.value != "" && secondNumber.value == "") {
    firstNumber.value = "";
  }
}

async function submitForm() {
  mainImg.style.display = "none";
  response = await jsonResponse("https://api-urna.herokuapp.com/candidatos");
  for (let i = 0; i < response.candidatos.length; i++) {
    console.log(voteNumber);
    if (response.candidatos[i].numero == Number(voteNumber)) {
      await fetch(
        `https://api-urna.herokuapp.com/candidatos/${Number(voteNumber)}`,
        {
          method: "POST",
        }
      );
      firstNumber.value = "";
      secondNumber.value = "";
      photo.style.display = "none";
      name.style.display = "none";
      playAudio("confirmAudio");
    }
  }
}

function playAudio(id) {
  let audio = document.getElementById(id);
  audio.play();
}
