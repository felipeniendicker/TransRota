const veiculos = [
    {
        id: 1,
        placa: "ABC1D23",
        modelo: "Sprinter",
        marca: "Mercedes-Benz",
        ano: 2022,
        categoria: "Van",
        capacidadeKg: 1200,
        status: "DISPONIVEL",
        ativo: true
    },
    {
        id: 2,
        placa: "XYZ9A99",
        modelo: "FH",
        marca: "Volvo",
        ano: 2020,
        categoria: "Caminhao",
        capacidadeKg: 24000,
        status: "EM_ROTA",
        ativo: true
    },
    {
        id: 3,
        placa: "MNT4B12",
        modelo: "Daily",
        marca: "Iveco",
        ano: 2021,
        categoria: "Utilitario",
        capacidadeKg: 1800,
        status: "MANUTENCAO",
        ativo: true
    }
];

const usuariosAutenticacao = [
    {
        nome: "Ana Souza",
        email: "chefe@transrota.com",
        senha: "123456",
        perfil: "CHEFE"
    },
    {
        nome: "Bruno Lima",
        email: "manutencao@transrota.com",
        senha: "123456",
        perfil: "MANUTENCAO"
    },
    {
        nome: "Carla Nunes",
        email: "comercial@transrota.com",
        senha: "123456",
        perfil: "COMERCIAL"
    }
];

const usuarios = [
    {
        id: 1,
        nome: "Ana Souza",
        email: "chefe@transrota.com",
        senha: "123456",
        perfil: "CHEFE",
        ativo: true
    },
    {
        id: 2,
        nome: "Bruno Lima",
        email: "manutencao@transrota.com",
        senha: "123456",
        perfil: "MANUTENCAO",
        ativo: true
    },
    {
        id: 3,
        nome: "Carla Nunes",
        email: "comercial@transrota.com",
        senha: "123456",
        perfil: "COMERCIAL",
        ativo: true
    }
];

const manutencoes = [
    {
        id: 1,
        veiculoId: 3,
        descricao: "Revisao do sistema de freios",
        dataAbertura: "2026-04-10",
        status: "ABERTA",
        observacao: "Aguardando avaliacao tecnica",
        ativo: true
    },
    {
        id: 2,
        veiculoId: 1,
        descricao: "Troca de oleo e filtros",
        dataAbertura: "2026-04-15",
        status: "EM_ANDAMENTO",
        observacao: "Servico iniciado pela equipe interna",
        ativo: true
    },
    {
        id: 3,
        veiculoId: 2,
        descricao: "Inspecao preventiva",
        dataAbertura: "2026-04-18",
        status: "CONCLUIDA",
        observacao: "Veiculo liberado para rota",
        ativo: true
    }
];

let usuarioLogado = null;
let veiculoEmEdicaoId = null;
let usuarioEmEdicaoId = null;
let manutencaoEmEdicaoId = null;
let proximoVeiculoId = 4;
let proximoUsuarioId = 4;
let proximoManutencaoId = 4;
let timerFeedbackVeiculo = null;
let timerFeedbackLogin = null;
let timerFeedbackUsuario = null;
let timerFeedbackManutencao = null;

const rotas = {
    dashboard: {
        titulo: "Dashboard",
        subtitulo: "Vis&atilde;o geral do sistema"
    },
    veiculos: {
        titulo: "Ve&iacute;culos",
        subtitulo: "Gest&atilde;o operacional da frota"
    },
    usuarios: {
        titulo: "Usu&aacute;rios",
        subtitulo: "Gest&atilde;o de usu&aacute;rios e perfis"
    },
    manutencoes: {
        titulo: "Manuten&ccedil;&otilde;es",
        subtitulo: "Controle b&aacute;sico de manuten&ccedil;&otilde;es"
    }
};

document.addEventListener("DOMContentLoaded", () => {
    renderizarVeiculos();
    renderizarUsuarios();
    renderizarOpcoesVeiculosManutencao();
    renderizarManutencoes();
    document.getElementById("loginEmail").focus();
    document.querySelectorAll("#loginEmail, #loginSenha").forEach((campo) => {
        campo.addEventListener("keydown", (evento) => {
            if (evento.key === "Enter") {
                autenticar();
            }
        });
    });
});

function autenticar() {
    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const senha = document.getElementById("loginSenha").value;

    if (!email || !senha) {
        mostrarFeedbackLogin("Informe email e senha para acessar.", "erro");
        return;
    }

    const usuario = usuariosAutenticacao.find((item) => {
        return item.email === email && item.senha === senha;
    });

    if (!usuario) {
        mostrarFeedbackLogin("Credenciais invalidas para o prototipo.", "erro");
        return;
    }

    usuarioLogado = {
        nome: usuario.nome,
        email: usuario.email,
        perfil: usuario.perfil
    };

    atualizarIdentidadeUsuario();
    document.getElementById("nomeUsuarioLogado").innerText = usuarioLogado.nome;
    document.getElementById("loginScreen").classList.add("hidden");
    document.getElementById("appShell").classList.remove("hidden");
    navegarPara("dashboard");
}

function sair() {
    usuarioLogado = null;
    document.getElementById("appShell").classList.add("hidden");
    document.getElementById("loginScreen").classList.remove("hidden");
    document.getElementById("loginSenha").value = "";
    document.getElementById("loginEmail").focus();
}

function mostrarFeedbackLogin(mensagem, tipo) {
    const feedback = document.getElementById("feedbackLogin");

    clearTimeout(timerFeedbackLogin);
    feedback.innerText = mensagem;
    feedback.className = `feedback ${tipo}`;

    timerFeedbackLogin = setTimeout(() => {
        feedback.classList.add("hidden");
    }, 3200);
}

function atualizarIdentidadeUsuario() {
    const badge = document.getElementById("perfilUsuarioLogado");

    badge.innerText = usuarioLogado.perfil;
    badge.className = `perfil-badge perfil-${usuarioLogado.perfil.toLowerCase()}`;
}

function navegarPara(view) {
    const rota = rotas[view];

    if (!rota) {
        return;
    }

    document.querySelectorAll("[data-view]").forEach((section) => {
        const ativa = section.dataset.view === view;
        section.classList.toggle("active", ativa);
        section.classList.toggle("hidden", !ativa);
    });

    document.querySelectorAll("[data-nav]").forEach((item) => {
        item.classList.toggle("active", item.dataset.nav === view);
    });

    document.getElementById("topbarTitulo").innerHTML = rota.titulo;
    document.getElementById("topbarSubtitulo").innerHTML = rota.subtitulo;

    if (view === "dashboard") {
        atualizarDashboard();
    }
}

function abrirFormUsuario() {
    usuarioEmEdicaoId = null;
    limparFormUsuario();
    document.getElementById("tituloFormUsuario").innerText = "Cadastrar usuario";
    mostrarFormUsuario();
}

function fecharFormUsuario() {
    document.getElementById("formUsuario").classList.add("hidden");
    usuarioEmEdicaoId = null;
}

function mostrarFormUsuario() {
    document.getElementById("formUsuario").classList.remove("hidden");
    document.getElementById("usuarioNome").focus();
}

function salvarUsuario() {
    const dados = lerDadosFormUsuario();
    const erro = validarUsuario(dados);

    if (erro) {
        mostrarFeedbackUsuario(erro, "erro");
        return;
    }

    const emailDuplicado = usuarios.some((usuario) => {
        return usuario.ativo && usuario.email === dados.email && usuario.id !== usuarioEmEdicaoId;
    });

    if (emailDuplicado) {
        mostrarFeedbackUsuario("Ja existe um usuario ativo com este email.", "erro");
        return;
    }

    if (usuarioEmEdicaoId) {
        const usuario = usuarios.find((item) => item.id === usuarioEmEdicaoId);
        Object.assign(usuario, dados);
        mostrarFeedbackUsuario("Usuario atualizado com sucesso.", "sucesso");
    } else {
        usuarios.push({
            id: proximoUsuarioId,
            ...dados,
            ativo: true
        });
        proximoUsuarioId += 1;
        mostrarFeedbackUsuario("Usuario cadastrado com sucesso.", "sucesso");
    }

    fecharFormUsuario();
    limparFormUsuario();
    renderizarUsuarios();
}

function editarUsuario(id) {
    const usuario = usuarios.find((item) => item.id === id && item.ativo);

    if (!usuario) {
        mostrarFeedbackUsuario("Usuario nao encontrado ou inativo.", "erro");
        return;
    }

    usuarioEmEdicaoId = id;

    document.getElementById("usuarioNome").value = usuario.nome;
    document.getElementById("usuarioEmail").value = usuario.email;
    document.getElementById("usuarioSenha").value = usuario.senha;
    document.getElementById("usuarioPerfil").value = usuario.perfil;
    document.getElementById("tituloFormUsuario").innerText = "Editar usuario";

    mostrarFormUsuario();
}

function desativarUsuario(id) {
    const usuario = usuarios.find((item) => item.id === id && item.ativo);

    if (!usuario) {
        mostrarFeedbackUsuario("Usuario nao encontrado ou ja inativo.", "erro");
        return;
    }

    const confirmar = confirm(`Deseja desativar o usuario ${usuario.nome}?`);

    if (!confirmar) {
        return;
    }

    usuario.ativo = false;
    renderizarUsuarios();
    mostrarFeedbackUsuario("Usuario desativado. A listagem padrao exibe apenas ativos.", "sucesso");
}

function renderizarUsuarios() {
    const tabela = document.getElementById("tabelaUsuarios");
    const vazio = document.getElementById("usuariosVazio");
    const busca = normalizarTexto(document.getElementById("filtroBuscaUsuario").value);
    const perfil = document.getElementById("filtroPerfilUsuario").value;

    const usuariosFiltrados = usuarios.filter((usuario) => {
        const correspondeBusca = !busca || [
            usuario.nome,
            usuario.email
        ].some((valor) => normalizarTexto(valor).includes(busca));

        const correspondePerfil = !perfil || usuario.perfil === perfil;

        return usuario.ativo && correspondeBusca && correspondePerfil;
    });

    tabela.innerHTML = usuariosFiltrados.map((usuario) => {
        return `
            <tr>
                <td><strong>${escaparHtml(usuario.nome)}</strong></td>
                <td>${escaparHtml(usuario.email)}</td>
                <td><span class="perfil-tag">${usuario.perfil}</span></td>
                <td><span class="status disponivel">Ativo</span></td>
                <td>
                    <div class="row-actions">
                        <button class="btn-icon btn-edit" onclick="editarUsuario(${usuario.id})" title="Editar usuario">Editar</button>
                        <button class="btn-icon btn-delete" onclick="desativarUsuario(${usuario.id})" title="Desativar usuario">Desativar</button>
                    </div>
                </td>
            </tr>
        `;
    }).join("");

    vazio.classList.toggle("hidden", usuariosFiltrados.length > 0);
}

function lerDadosFormUsuario() {
    return {
        nome: document.getElementById("usuarioNome").value.trim(),
        email: document.getElementById("usuarioEmail").value.trim().toLowerCase(),
        senha: document.getElementById("usuarioSenha").value,
        perfil: document.getElementById("usuarioPerfil").value
    };
}

function validarUsuario(usuario) {
    if (!usuario.nome) {
        return "Nome e obrigatorio.";
    }

    if (!usuario.email || !usuario.email.includes("@")) {
        return "Informe um email valido.";
    }

    if (!usuario.senha) {
        return "Senha e obrigatoria.";
    }

    if (!["CHEFE", "COMERCIAL", "MANUTENCAO"].includes(usuario.perfil)) {
        return "Perfil obrigatorio ou invalido.";
    }

    return "";
}

function limparFormUsuario() {
    document.getElementById("usuarioNome").value = "";
    document.getElementById("usuarioEmail").value = "";
    document.getElementById("usuarioSenha").value = "";
    document.getElementById("usuarioPerfil").value = "";
}

function mostrarFeedbackUsuario(mensagem, tipo) {
    const feedback = document.getElementById("feedbackUsuario");

    clearTimeout(timerFeedbackUsuario);
    feedback.innerText = mensagem;
    feedback.className = `feedback ${tipo}`;

    timerFeedbackUsuario = setTimeout(() => {
        feedback.classList.add("hidden");
    }, 3200);
}

function abrirFormManutencao() {
    manutencaoEmEdicaoId = null;
    limparFormManutencao();
    renderizarOpcoesVeiculosManutencao();
    document.getElementById("tituloFormManutencao").innerText = "Cadastrar manutencao";
    mostrarFormManutencao();
}

function fecharFormManutencao() {
    document.getElementById("formManutencao").classList.add("hidden");
    manutencaoEmEdicaoId = null;
}

function mostrarFormManutencao() {
    document.getElementById("formManutencao").classList.remove("hidden");
    document.getElementById("manutencaoVeiculo").focus();
}

function salvarManutencao() {
    const dados = lerDadosFormManutencao();
    const erro = validarManutencao(dados);

    if (erro) {
        mostrarFeedbackManutencao(erro, "erro");
        return;
    }

    if (manutencaoEmEdicaoId) {
        const manutencao = manutencoes.find((item) => item.id === manutencaoEmEdicaoId);
        Object.assign(manutencao, dados);
        mostrarFeedbackManutencao("Manutencao atualizada com sucesso.", "sucesso");
    } else {
        manutencoes.push({
            id: proximoManutencaoId,
            ...dados,
            ativo: true
        });
        proximoManutencaoId += 1;
        mostrarFeedbackManutencao("Manutencao cadastrada com sucesso.", "sucesso");
    }

    fecharFormManutencao();
    limparFormManutencao();
    renderizarManutencoes();
}

function editarManutencao(id) {
    const manutencao = manutencoes.find((item) => item.id === id && item.ativo);

    if (!manutencao) {
        mostrarFeedbackManutencao("Manutencao nao encontrada ou inativa.", "erro");
        return;
    }

    manutencaoEmEdicaoId = id;
    renderizarOpcoesVeiculosManutencao();

    document.getElementById("manutencaoVeiculo").value = String(manutencao.veiculoId);
    document.getElementById("manutencaoStatus").value = manutencao.status;
    document.getElementById("manutencaoDataAbertura").value = manutencao.dataAbertura;
    document.getElementById("manutencaoDescricao").value = manutencao.descricao;
    document.getElementById("manutencaoObservacao").value = manutencao.observacao;
    document.getElementById("tituloFormManutencao").innerText = "Editar manutencao";

    mostrarFormManutencao();
}

function desativarManutencao(id) {
    const manutencao = manutencoes.find((item) => item.id === id && item.ativo);

    if (!manutencao) {
        mostrarFeedbackManutencao("Manutencao nao encontrada ou ja inativa.", "erro");
        return;
    }

    const veiculo = buscarVeiculoPorId(manutencao.veiculoId);
    const confirmar = confirm(`Deseja desativar a manutencao do veiculo ${veiculo ? veiculo.placa : ""}?`);

    if (!confirmar) {
        return;
    }

    manutencao.ativo = false;
    fecharDetalhesManutencao();
    renderizarManutencoes();
    mostrarFeedbackManutencao("Manutencao desativada. A listagem padrao exibe apenas ativas.", "sucesso");
}

function verDetalhesManutencao(id) {
    const manutencao = manutencoes.find((item) => item.id === id && item.ativo);

    if (!manutencao) {
        mostrarFeedbackManutencao("Manutencao nao encontrada ou inativa.", "erro");
        return;
    }

    const veiculo = buscarVeiculoPorId(manutencao.veiculoId);
    const detalhes = document.getElementById("conteudoDetalhesManutencao");

    detalhes.innerHTML = `
        <div>
            <span>Veiculo</span>
            <strong>${veiculo ? escaparHtml(veiculo.placa) : "Veiculo inativo"}</strong>
        </div>
        <div>
            <span>Descricao</span>
            <strong>${escaparHtml(manutencao.descricao)}</strong>
        </div>
        <div>
            <span>Data de abertura</span>
            <strong>${formatarData(manutencao.dataAbertura)}</strong>
        </div>
        <div>
            <span>Status</span>
            <strong>${rotuloStatusManutencao(manutencao.status)}</strong>
        </div>
        <div>
            <span>Observacao</span>
            <strong>${escaparHtml(manutencao.observacao || "Sem observacao")}</strong>
        </div>
        <div>
            <span>Situacao</span>
            <strong>Ativa</strong>
        </div>
    `;

    document.getElementById("detalhesManutencao").classList.remove("hidden");
}

function fecharDetalhesManutencao() {
    document.getElementById("detalhesManutencao").classList.add("hidden");
}

function renderizarManutencoes() {
    const tabela = document.getElementById("tabelaManutencoes");
    const vazio = document.getElementById("manutencoesVazio");
    const busca = normalizarTexto(document.getElementById("filtroBuscaManutencao").value);
    const status = document.getElementById("filtroStatusManutencao").value;

    const manutencoesFiltradas = manutencoes.filter((manutencao) => {
        const veiculo = buscarVeiculoPorId(manutencao.veiculoId);
        const placa = veiculo ? veiculo.placa : "";
        const correspondeBusca = !busca || [
            placa,
            manutencao.descricao
        ].some((valor) => normalizarTexto(valor).includes(busca));

        const correspondeStatus = !status || manutencao.status === status;

        return manutencao.ativo && correspondeBusca && correspondeStatus;
    });

    tabela.innerHTML = manutencoesFiltradas.map((manutencao) => {
        const veiculo = buscarVeiculoPorId(manutencao.veiculoId);

        return `
            <tr>
                <td><strong>${veiculo ? escaparHtml(veiculo.placa) : "Veiculo inativo"}</strong></td>
                <td>${escaparHtml(manutencao.descricao)}</td>
                <td>${formatarData(manutencao.dataAbertura)}</td>
                <td><span class="status ${classeStatusManutencao(manutencao.status)}">${rotuloStatusManutencao(manutencao.status)}</span></td>
                <td>${escaparHtml(manutencao.observacao || "-")}</td>
                <td>
                    <div class="row-actions">
                        <button class="btn-icon btn-secondary" onclick="verDetalhesManutencao(${manutencao.id})" title="Ver detalhes">Detalhes</button>
                        <button class="btn-icon btn-edit" onclick="editarManutencao(${manutencao.id})" title="Editar manutencao">Editar</button>
                        <button class="btn-icon btn-delete" onclick="desativarManutencao(${manutencao.id})" title="Desativar manutencao">Desativar</button>
                    </div>
                </td>
            </tr>
        `;
    }).join("");

    vazio.classList.toggle("hidden", manutencoesFiltradas.length > 0);
}

function renderizarOpcoesVeiculosManutencao() {
    const select = document.getElementById("manutencaoVeiculo");

    if (!select) {
        return;
    }

    const opcoes = veiculos
        .filter((veiculo) => veiculo.ativo)
        .map((veiculo) => {
            return `<option value="${veiculo.id}">${escaparHtml(veiculo.placa)} - ${escaparHtml(veiculo.modelo)}</option>`;
        })
        .join("");

    select.innerHTML = `<option value="">Selecione</option>${opcoes}`;
}

function lerDadosFormManutencao() {
    return {
        veiculoId: Number(document.getElementById("manutencaoVeiculo").value),
        descricao: document.getElementById("manutencaoDescricao").value.trim(),
        dataAbertura: document.getElementById("manutencaoDataAbertura").value,
        status: document.getElementById("manutencaoStatus").value,
        observacao: document.getElementById("manutencaoObservacao").value.trim()
    };
}

function validarManutencao(manutencao) {
    if (!buscarVeiculoPorId(manutencao.veiculoId)) {
        return "Veiculo e obrigatorio.";
    }

    if (!manutencao.descricao) {
        return "Descricao e obrigatoria.";
    }

    if (!manutencao.dataAbertura) {
        return "Data de abertura e obrigatoria.";
    }

    if (!["ABERTA", "EM_ANDAMENTO", "CONCLUIDA"].includes(manutencao.status)) {
        return "Status obrigatorio ou invalido.";
    }

    return "";
}

function limparFormManutencao() {
    document.getElementById("manutencaoVeiculo").value = "";
    document.getElementById("manutencaoStatus").value = "";
    document.getElementById("manutencaoDataAbertura").value = "";
    document.getElementById("manutencaoDescricao").value = "";
    document.getElementById("manutencaoObservacao").value = "";
}

function mostrarFeedbackManutencao(mensagem, tipo) {
    const feedback = document.getElementById("feedbackManutencao");

    clearTimeout(timerFeedbackManutencao);
    feedback.innerText = mensagem;
    feedback.className = `feedback ${tipo}`;

    timerFeedbackManutencao = setTimeout(() => {
        feedback.classList.add("hidden");
    }, 3200);
}

function buscarVeiculoPorId(id) {
    return veiculos.find((veiculo) => veiculo.id === Number(id) && veiculo.ativo);
}

function abrirForm() {
    veiculoEmEdicaoId = null;
    limparFormVeiculo();
    document.getElementById("tituloFormVeiculo").innerText = "Cadastrar veiculo";
    mostrarForm();
}

function fecharForm() {
    document.getElementById("formVeiculo").classList.add("hidden");
    veiculoEmEdicaoId = null;
}

function mostrarForm() {
    document.getElementById("formVeiculo").classList.remove("hidden");
    document.getElementById("placa").focus();
}

function salvarVeiculo() {
    const dados = lerDadosFormVeiculo();
    const erro = validarVeiculo(dados);

    if (erro) {
        mostrarFeedbackVeiculo(erro, "erro");
        return;
    }

    const placaDuplicada = veiculos.some((veiculo) => {
        return veiculo.ativo && veiculo.placa === dados.placa && veiculo.id !== veiculoEmEdicaoId;
    });

    if (placaDuplicada) {
        mostrarFeedbackVeiculo("Ja existe um veiculo ativo com esta placa.", "erro");
        return;
    }

    if (veiculoEmEdicaoId) {
        const veiculo = veiculos.find((item) => item.id === veiculoEmEdicaoId);
        Object.assign(veiculo, dados);
        mostrarFeedbackVeiculo("Veiculo atualizado com sucesso.", "sucesso");
    } else {
        veiculos.push({
            id: proximoVeiculoId,
            ...dados,
            ativo: true
        });
        proximoVeiculoId += 1;
        mostrarFeedbackVeiculo("Veiculo cadastrado com sucesso.", "sucesso");
    }

    fecharForm();
    limparFormVeiculo();
    renderizarVeiculos();
    renderizarOpcoesVeiculosManutencao();
}

function editarVeiculo(id) {
    const veiculo = veiculos.find((item) => item.id === id && item.ativo);

    if (!veiculo) {
        mostrarFeedbackVeiculo("Veiculo nao encontrado ou inativo.", "erro");
        return;
    }

    veiculoEmEdicaoId = id;

    document.getElementById("placa").value = veiculo.placa;
    document.getElementById("modelo").value = veiculo.modelo;
    document.getElementById("marca").value = veiculo.marca;
    document.getElementById("ano").value = veiculo.ano;
    document.getElementById("categoria").value = veiculo.categoria;
    document.getElementById("capacidade").value = veiculo.capacidadeKg;
    document.getElementById("status").value = veiculo.status;
    document.getElementById("tituloFormVeiculo").innerText = "Editar veiculo";

    mostrarForm();
}

function desativarVeiculo(id) {
    const veiculo = veiculos.find((item) => item.id === id && item.ativo);

    if (!veiculo) {
        mostrarFeedbackVeiculo("Veiculo nao encontrado ou ja inativo.", "erro");
        return;
    }

    const confirmar = confirm(`Deseja desativar o veiculo ${veiculo.placa}?`);

    if (!confirmar) {
        return;
    }

    veiculo.ativo = false;
    renderizarVeiculos();
    renderizarOpcoesVeiculosManutencao();
    renderizarManutencoes();
    mostrarFeedbackVeiculo("Veiculo desativado. A listagem padrao exibe apenas ativos.", "sucesso");
}

function renderizarVeiculos() {
    const tabela = document.getElementById("tabelaVeiculos");
    const vazio = document.getElementById("veiculosVazio");
    const busca = normalizarTexto(document.getElementById("filtroBuscaVeiculo").value);
    const categoria = document.getElementById("filtroCategoriaVeiculo").value;
    const status = document.getElementById("filtroStatusVeiculo").value;

    const veiculosFiltrados = veiculos.filter((veiculo) => {
        const correspondeBusca = !busca || [
            veiculo.placa,
            veiculo.modelo,
            veiculo.marca
        ].some((valor) => normalizarTexto(valor).includes(busca));

        const correspondeCategoria = !categoria || veiculo.categoria === categoria;
        const correspondeStatus = !status || veiculo.status === status;

        return veiculo.ativo && correspondeBusca && correspondeCategoria && correspondeStatus;
    });

    tabela.innerHTML = veiculosFiltrados.map((veiculo) => {
        return `
            <tr>
                <td><strong>${escaparHtml(veiculo.placa)}</strong></td>
                <td>${escaparHtml(veiculo.modelo)}</td>
                <td>${escaparHtml(veiculo.marca)}</td>
                <td>${veiculo.ano}</td>
                <td>${rotuloCategoria(veiculo.categoria)}</td>
                <td>${formatarKg(veiculo.capacidadeKg)}</td>
                <td><span class="status ${classeStatus(veiculo.status)}">${rotuloStatus(veiculo.status)}</span></td>
                <td>
                    <div class="row-actions">
                        <button class="btn-icon btn-edit" onclick="editarVeiculo(${veiculo.id})" title="Editar veiculo">Editar</button>
                        <button class="btn-icon btn-delete" onclick="desativarVeiculo(${veiculo.id})" title="Desativar veiculo">Desativar</button>
                    </div>
                </td>
            </tr>
        `;
    }).join("");

    vazio.classList.toggle("hidden", veiculosFiltrados.length > 0);
}

function lerDadosFormVeiculo() {
    return {
        placa: document.getElementById("placa").value.trim().toUpperCase(),
        modelo: document.getElementById("modelo").value.trim(),
        marca: document.getElementById("marca").value.trim(),
        ano: Number(document.getElementById("ano").value),
        categoria: document.getElementById("categoria").value,
        capacidadeKg: Number(document.getElementById("capacidade").value),
        status: document.getElementById("status").value
    };
}

function validarVeiculo(veiculo) {
    const anoAtual = new Date().getFullYear() + 1;

    if (!veiculo.placa) {
        return "Placa e obrigatoria.";
    }

    if (!veiculo.modelo) {
        return "Modelo e obrigatorio.";
    }

    if (!veiculo.marca) {
        return "Marca e obrigatoria.";
    }

    if (!veiculo.ano || veiculo.ano < 1980 || veiculo.ano > anoAtual) {
        return "Informe um ano valido para o veiculo.";
    }

    if (!veiculo.categoria) {
        return "Categoria e obrigatoria.";
    }

    if (!veiculo.capacidadeKg || veiculo.capacidadeKg <= 0) {
        return "Capacidade deve ser maior que zero.";
    }

    if (!["DISPONIVEL", "EM_ROTA", "MANUTENCAO", "BAIXADO"].includes(veiculo.status)) {
        return "Status obrigatorio ou invalido.";
    }

    return "";
}

function limparFormVeiculo() {
    document.getElementById("placa").value = "";
    document.getElementById("modelo").value = "";
    document.getElementById("marca").value = "";
    document.getElementById("ano").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("capacidade").value = "";
    document.getElementById("status").value = "";
}

function mostrarFeedbackVeiculo(mensagem, tipo) {
    const feedback = document.getElementById("feedbackVeiculo");

    clearTimeout(timerFeedbackVeiculo);
    feedback.innerText = mensagem;
    feedback.className = `feedback ${tipo}`;

    timerFeedbackVeiculo = setTimeout(() => {
        feedback.classList.add("hidden");
    }, 3200);
}

function classeStatus(status) {
    const classes = {
        DISPONIVEL: "disponivel",
        EM_ROTA: "rota",
        MANUTENCAO: "manutencao",
        BAIXADO: "baixado"
    };

    return classes[status] || "baixado";
}

function rotuloStatus(status) {
    const rotulos = {
        DISPONIVEL: "Disponivel",
        EM_ROTA: "Em rota",
        MANUTENCAO: "Manutencao",
        BAIXADO: "Baixado"
    };

    return rotulos[status] || status;
}

function rotuloCategoria(categoria) {
    const rotulos = {
        Caminhao: "Caminh&atilde;o",
        Utilitario: "Utilit&aacute;rio"
    };

    return rotulos[categoria] || categoria;
}

function classeStatusManutencao(status) {
    const classes = {
        ABERTA: "aberta",
        EM_ANDAMENTO: "andamento",
        CONCLUIDA: "concluida"
    };

    return classes[status] || "baixado";
}

function rotuloStatusManutencao(status) {
    const rotulos = {
        ABERTA: "Aberta",
        EM_ANDAMENTO: "Em andamento",
        CONCLUIDA: "Concluida"
    };

    return rotulos[status] || status;
}

function formatarKg(valor) {
    return `${Number(valor).toLocaleString("pt-BR")} kg`;
}

function formatarData(valor) {
    if (!valor) {
        return "-";
    }

    const partes = valor.split("-");

    if (partes.length !== 3) {
        return valor;
    }

    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

function normalizarTexto(valor) {
    return String(valor || "").trim().toLowerCase();
}

function escaparHtml(valor) {
    return String(valor || "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function atualizarDashboard() {
    const ativos = veiculos.filter((veiculo) => veiculo.ativo);
    const emRota = ativos.filter((veiculo) => veiculo.status === "EM_ROTA");
    const emManutencao = ativos.filter((veiculo) => veiculo.status === "MANUTENCAO");

    document.getElementById("totalVeiculosAtivos").innerText = ativos.length;
    document.getElementById("totalVeiculosRota").innerText = emRota.length;
    document.getElementById("totalVeiculosManutencao").innerText = emManutencao.length;
}
