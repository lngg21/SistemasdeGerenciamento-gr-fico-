class ContaBancaria {
    constructor(agencia, numero, tipo, saldo) {
        this.agencia = agencia;
        this.numero = numero;
        this.tipo = tipo;
        this.saldo = parseFloat(saldo);
    }

    sacar(valor) {
        if (valor <= this.saldo) {
            this.saldo -= valor;
            return true;
        }
        return false;
    }

    depositar(valor) {
        if (valor > 0) {
            this.saldo += valor;
            return true;
        }
        return false;
    }
}

class ContaCorrente extends ContaBancaria {
    constructor(agencia, numero, saldo, cartaoCredito) {
        super(agencia, numero, "Conta Corrente", saldo);
        this.cartaoCredito = cartaoCredito;
    }
}

class ContaPoupanca extends ContaBancaria {
    constructor(agencia, numero, saldo) {
        super(agencia, numero, "Conta Poupança", saldo);
    }
}

class ContaUniversitaria extends ContaBancaria {
    constructor(agencia, numero, saldo) {
        super(agencia, numero, "Conta Universitária", saldo);
    }

    sacar(valor) {
        if (this.tipo === "Conta Universitária" && valor <= 500) {
            return super.sacar(valor);
        }
        return false;
    }
}

const contas = [];

function inserirConta() {
    const agencia = document.getElementById("agencia").value;
    const numero = document.getElementById("numero").value;
    const tipo = document.getElementById("tipo").value;
    const saldo = document.getElementById("saldo").value;

    let novaConta;

    if (tipo === "Corrente") {
        const cartaoCredito = prompt("Informe o limite do cartão de crédito:");
        novaConta = new ContaCorrente(agencia, numero, saldo, cartaoCredito);
    } else if (tipo === "Poupanca") {
        novaConta = new ContaPoupanca(agencia, numero, saldo);
    } else if (tipo === "Universitaria") {
        novaConta = new ContaUniversitaria(agencia, numero, saldo);
    }

    contas.push(novaConta);
    alert("Conta inserida com sucesso!");
}

function visualizarContas() {
    const listaContas = document.getElementById("listaContas");
    listaContas.innerHTML = "";

    for (const conta of contas) {
        const item = document.createElement("li");
        item.textContent = `Agência: ${conta.agencia} / Número: ${conta.numero} / Tipo: ${conta.tipo} / Saldo: R$ ${conta.saldo.toFixed(2)}`;
        listaContas.appendChild(item);
    }
    const dados = {
        labels: ["Conta Corrente", "Conta Poupança", "Conta Universitária"],
        datasets: [
            {
                label: "Número de Contas",
                data: [
                    contas.filter((conta) => conta.tipo === "Conta Corrente").length,
                    contas.filter((conta) => conta.tipo === "Conta Poupança").length,
                    contas.filter((conta) => conta.tipo === "Conta Universitária").length,
                ],
                backgroundColor: ["rgba(255, 99, 132, 0.5)", "rgba(54, 162, 235, 0.5)", "rgba(255, 206, 86, 0.5)"],
                borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
                borderWidth: 1,
            },
        ],
    };

    const ctxBarras = document.getElementById("graficoBarras").getContext("2d");
    new Chart(ctxBarras, {
        type: "bar",
        data: dados,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });

    const ctxPizza = document.getElementById("graficoPizza").getContext("2d");
    new Chart(ctxPizza, {
        type: "doughnut",
        data: dados,
    });

    const ctxLinhas = document.getElementById("graficoLinhas").getContext("2d");
    new Chart(ctxLinhas, {
        type: "line",
        data: {
            labels: ["Conta 1", "Conta 2", "Conta 3", "Conta 4"], // Adicione rótulos apropriados aqui
            datasets: [
                {
                    label: "Saldo",
                    data: [1000, 2000, 1500, 3000], // Substitua com os saldos reais das contas
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1,
                    fill: false,
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
}