let opcaoSelecionada = null;

// Carrega opções de voto ao iniciar
fetch('/api/opcoes')
  .then(res => res.json())
  .then(opcoes => {
    const container = document.getElementById('opcoes');
    opcoes.forEach(opcao => {
      const label = document.createElement('label');
      label.innerHTML = `
        <input type="radio" name="voto" value="${opcao.id}"> ${opcao.nome}
      `;
      container.appendChild(label);
    });

    document.querySelectorAll('input[name="voto"]').forEach(input => {
      input.addEventListener('change', () => {
        opcaoSelecionada = input.value;
      });
    });

    carregarResultados();
  });

function enviarVoto() {
  if (!opcaoSelecionada) {
    alert("Escolha uma opção antes de votar.");
    return;
  }

  fetch('/api/votar', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ opcao_id: opcaoSelecionada })
  })
  .then(res => res.json())
  .then(data => {
    alert(data.mensagem || "Voto registrado!");
    carregarResultados();
  });
}

function carregarResultados() {
  fetch('/api/resultado')
    .then(res => res.json())
    .then(resultados => {
      const container = document.getElementById('resultado');
      container.innerHTML = "";
      resultados.forEach(r => {
        container.innerHTML += `<p>${r.nome}: ${r.votos} votos</p>`;
      });
    });
}
