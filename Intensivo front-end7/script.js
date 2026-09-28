// =====================================================
// INTENSIVO DE FRONT-END 07
// INTERFACES WEB CONSUMINDO API
// =====================================================


// =====================================================
// EXERCÍCIO 1
// UTILIZAR FETCH PARA BUSCAR DADOS DE UMA API
// =====================================================

const btnApi = document.getElementById("btnApi");
const resultadoApi = document.getElementById("resultadoApi");

btnApi.addEventListener("click", async () => {

    resultadoApi.innerHTML = `
        <p class="mensagem-inicial">
            Carregando dados...
        </p>
    `;

    try {

        const numero = Math.floor(Math.random() * 20) + 1;

        const resposta = await fetch(
            `https://rickandmortyapi.com/api/character/${numero}`
        );

        if (!resposta.ok) {
            throw new Error("Erro ao buscar os dados.");
        }

        const personagem = await resposta.json();

        resultadoApi.innerHTML = `
            <div class="personagem">

                <img
                    src="${personagem.image}"
                    alt="${personagem.name}"
                >

                <div>

                    <h3>${personagem.name}</h3>

                    <p class="info">
                        <strong>Status:</strong>
                        ${personagem.status}
                    </p>

                    <p class="info">
                        <strong>Espécie:</strong>
                        ${personagem.species}
                    </p>

                    <p class="info">
                        <strong>Gênero:</strong>
                        ${personagem.gender}
                    </p>

                </div>

            </div>
        `;

    } catch (erro) {

        resultadoApi.innerHTML = `
            <p class="login-erro">
                Não foi possível carregar os dados.
            </p>
        `;

        console.error(erro);
    }
});


// =====================================================
// EXERCÍCIO 2
// CAMPO DE BUSCA QUE FILTRA INFORMAÇÕES DA API
// =====================================================

const campoBusca = document.getElementById("campoBusca");
const btnBusca = document.getElementById("btnBusca");
const resultadoBusca = document.getElementById("resultadoBusca");

async function realizarBusca() {

    const nome = campoBusca.value.trim();

    if (nome === "") {

        resultadoBusca.innerHTML = `
            <p class="login-erro">
                Digite o nome de um personagem.
            </p>
        `;

        return;
    }

    resultadoBusca.innerHTML = `
        <p class="mensagem-inicial">
            Procurando...
        </p>
    `;

    try {

        const resposta = await fetch(
            `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(nome)}`
        );

        if (!resposta.ok) {
            throw new Error("Personagem não encontrado.");
        }

        const dados = await resposta.json();

        const personagens = dados.results.slice(0, 6);

        resultadoBusca.innerHTML = `
            <div class="lista-usuarios">

                ${personagens.map(personagem => `

                    <div class="usuario">

                        <h3>${personagem.name}</h3>

                        <p>
                            <strong>Status:</strong>
                            ${personagem.status}
                        </p>

                        <p>
                            <strong>Espécie:</strong>
                            ${personagem.species}
                        </p>

                        <p>
                            <strong>Localização:</strong>
                            ${personagem.location.name}
                        </p>

                    </div>

                `).join("")}

            </div>
        `;

    } catch (erro) {

        resultadoBusca.innerHTML = `
            <p class="login-erro">
                Nenhum personagem encontrado.
            </p>
        `;

        console.error(erro);
    }
}


btnBusca.addEventListener("click", realizarBusca);


campoBusca.addEventListener("keydown", (evento) => {

    if (evento.key === "Enter") {
        realizarBusca();
    }

});


// =====================================================
// EXERCÍCIO 3
// SISTEMA DE LOGIN VALIDADO POR API FICTÍCIA
// =====================================================

const formLogin = document.getElementById("formLogin");
const mensagemLogin = document.getElementById("mensagemLogin");

formLogin.addEventListener("submit", async (evento) => {

    evento.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;

    mensagemLogin.innerHTML = `
        <p class="mensagem-inicial">
            Validando seus dados...
        </p>
    `;

    try {

        const resposta = await fetch(
            "https://dummyjson.com/auth/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    username: usuario,
                    password: senha
                })
            }
        );

        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(
                dados.message || "Usuário ou senha incorretos."
            );
        }

        mensagemLogin.innerHTML = `
            <div class="login-sucesso">

                <strong>
                    Login realizado com sucesso!
                </strong>

                <p>
                    Bem-vindo(a), ${dados.firstName} ${dados.lastName}.
                </p>

            </div>
        `;

    } catch (erro) {

        mensagemLogin.innerHTML = `
            <div class="login-erro">

                <strong>
                    Não foi possível realizar o login.
                </strong>

                <p>
                    Verifique seu usuário e sua senha.
                </p>

            </div>
        `;

        console.error(erro);
    }

});


// =====================================================
// EXERCÍCIO 4
// LISTA DE USUÁRIOS CONSUMIDA DE UMA API JSON
// =====================================================

const btnUsuarios = document.getElementById("btnUsuarios");
const listaUsuarios = document.getElementById("listaUsuarios");

btnUsuarios.addEventListener("click", async () => {

    listaUsuarios.innerHTML = `
        <p class="mensagem-inicial">
            Carregando usuários...
        </p>
    `;

    try {

        const resposta = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        if (!resposta.ok) {
            throw new Error("Erro ao carregar usuários.");
        }

        const usuarios = await resposta.json();

        listaUsuarios.innerHTML = `
            <div class="lista-usuarios">

                ${usuarios.map(usuario => `

                    <div class="usuario">

                        <h3>${usuario.name}</h3>

                        <p>
                            <strong>Usuário:</strong>
                            ${usuario.username}
                        </p>

                        <p>
                            <strong>E-mail:</strong>
                            ${usuario.email}
                        </p>

                        <p>
                            <strong>Cidade:</strong>
                            ${usuario.address.city}
                        </p>

                        <p>
                            <strong>Empresa:</strong>
                            ${usuario.company.name}
                        </p>

                    </div>

                `).join("")}

            </div>
        `;

    } catch (erro) {

        listaUsuarios.innerHTML = `
            <div class="login-erro">
                Não foi possível carregar os usuários.
            </div>
        `;

        console.error(erro);
    }

});


// =====================================================
// EXERCÍCIO 5
// PREVISÃO DO TEMPO BASEADA NA LOCALIZAÇÃO
// =====================================================

const btnLocalizacao = document.getElementById("btnLocalizacao");
const resultadoClima = document.getElementById("resultadoClima");


btnLocalizacao.addEventListener("click", () => {

    resultadoClima.innerHTML = `
        <p class="mensagem-inicial">
            Obtendo sua localização...
        </p>
    `;


    if (!navigator.geolocation) {

        resultadoClima.innerHTML = `
            <div class="login-erro">
                Seu navegador não suporta geolocalização.
            </div>
        `;

        return;
    }


    navigator.geolocation.getCurrentPosition(

        async (posicao) => {

            const latitude = posicao.coords.latitude;
            const longitude = posicao.coords.longitude;

            resultadoClima.innerHTML = `
                <p class="mensagem-inicial">
                    Buscando informações do clima...
                </p>
            `;


            try {

                const resposta = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=auto`
                );


                if (!resposta.ok) {
                    throw new Error("Erro ao consultar o clima.");
                }


                const dados = await resposta.json();

                const clima = dados.current;


                const descricaoClima =
                    interpretarClima(clima.weather_code);


                resultadoClima.innerHTML = `

                    <div class="clima-box">

                        <h3>
                            Clima atual
                        </h3>

                        <div class="temperatura">
                            ${clima.temperature_2m}°C
                        </div>

                        <p>
                            ${descricaoClima}
                        </p>


                        <div class="clima-info">

                            <div class="clima-item">

                                <strong>
                                    Sensação
                                </strong>

                                ${clima.apparent_temperature}°C

                            </div>


                            <div class="clima-item">

                                <strong>
                                    Umidade
                                </strong>

                                ${clima.relative_humidity_2m}%

                            </div>


                            <div class="clima-item">

                                <strong>
                                    Vento
                                </strong>

                                ${clima.wind_speed_10m} km/h

                            </div>

                        </div>

                    </div>

                `;

            } catch (erro) {

                resultadoClima.innerHTML = `
                    <div class="login-erro">
                        Não foi possível consultar a previsão do tempo.
                    </div>
                `;

                console.error(erro);
            }

        },


        () => {

            resultadoClima.innerHTML = `
                <div class="login-erro">

                    <strong>
                        Não foi possível obter sua localização.
                    </strong>

                    <p>
                        Permita o acesso à localização no navegador
                        e tente novamente.
                    </p>

                </div>
            `;

        }

    );

});


// =====================================================
// INTERPRETAÇÃO DOS CÓDIGOS DO CLIMA
// =====================================================

function interpretarClima(codigo) {

    if (codigo === 0) {
        return "Céu limpo";
    }

    if (codigo === 1 || codigo === 2) {
        return "Parcialmente nublado";
    }

    if (codigo === 3) {
        return "Nublado";
    }

    if (
        codigo === 45 ||
        codigo === 48
    ) {
        return "Neblina";
    }

    if (
        codigo >= 51 &&
        codigo <= 57
    ) {
        return "Garoa";
    }

    if (
        codigo >= 61 &&
        codigo <= 67
    ) {
        return "Chuva";
    }

    if (
        codigo >= 71 &&
        codigo <= 77
    ) {
        return "Neve";
    }

    if (
        codigo >= 80 &&
        codigo <= 82
    ) {
        return "Pancadas de chuva";
    }

    if (
        codigo >= 95 &&
        codigo <= 99
    ) {
        return "Tempestade";
    }

    return "Condição climática não identificada";
}