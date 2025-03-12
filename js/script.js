let conteudoAtual = "";
async function carregarConteudo(topico) {
    const resposta = await fetch("data/conteudo.json");
    const dados = await resposta.json();

    document.getElementById("conteudo").innerHTML = `<h2>${topico.replace("_", " ").toUpperCase()}</h2><p>${dados[topico].resumo}</p>`;
    conteudoAtual = topico;
    document.getElementById("iniciarQuestoes").style.display = "block";
}

async function iniciarQuestoes() {
    const resposta = await fetch("data/conteudo.json");
    const dados = await resposta.json();
    const questoes = dados[conteudoAtual].questoes;

    let htmlQuestoes = "<h2>Questões</h2>";
    questoes.forEach((q, index) => {
        htmlQuestoes += `<p>${q.pergunta}</p>`;
        q.opcoes.forEach((op, i) => {
            htmlQuestoes += `<button onclick="verificarResposta(${index}, ${i})">${op}</button><br>`;
        });
    });

    document.getElementById("questoes").innerHTML = htmlQuestoes;
    document.getElementById("questoes").style.display = "block";
}

function verificarResposta(index, respostaEscolhida) {
    fetch("data/conteudo.json")
        .then(response => response.json())
        .then(dados => {
            const correta = dados[conteudoAtual].questoes[index].correta;
            if (respostaEscolhida === correta) {
                alert("✅ Resposta correta!");
            } else {
                alert("❌ Resposta errada!");
            }
        });
}
