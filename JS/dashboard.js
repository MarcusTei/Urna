getData()

async function getData(){
    let response = await fetch("https://api-urna.herokuapp.com/candidatos");
    response = await response.json()
    const access = response.candidatos

    for (let i = 0; i < access.length; i++) {
        let name = access[i].nome
        let photo = access[i].foto
        let num = access[i].numero
        let votes = access[i].votos
        document.getElementById('dashboard').innerHTML += `<div class="candidate"><div><img src="${photo}" class="candidatePhoto"></div><div class="candidateInformation"><p>Nome: ${name}</p><p>Número: ${num}</p><p>Votos totais: ${votes}</p></div></div>`
    }
}

