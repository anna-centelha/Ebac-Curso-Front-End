
class EquipamentoEletronico {
    constructor() {
        if (this.constructor === EquipamentoEletronico) {
            throw new Error("EquipamentoEletronico é uma classe abstrata e não pode ser instanciada diretamente.");
        }
        this.ligado = false;
        this.voltagem = 220;
    }

    ligar() {
        this.ligado = true;
        console.log(`${this.nome} está ligado.`);
    }

    desligar() {
        this.ligado = false;
        console.log(`${this.nome} está desligado.`);
    }
}

class Computador extends EquipamentoEletronico {
    constructor(nome, processador, memoria) {
        super();
        this.nome = nome;
        this.processador = processador;
        this.memoria = memoria;
    }

    info() {
        console.log(`Computador: ${this.nome}`);
        console.log(`Processador: ${this.processador}`);
        console.log(`Memória: ${this.memoria}GB`);
        console.log(`Voltagem: ${this.voltagem}V`);
        console.log(`Estado: ${this.ligado ? 'Ligado' : 'Desligado'}`);
        console.log('---------------------');
    }
}

class Smartphone extends EquipamentoEletronico {
    constructor(nome, marca, armazenamento) {
        super();
        this.nome = nome;
        this.marca = marca;
        this.armazenamento = armazenamento;
        this.voltagem = 110; 
    }

    info() {
        console.log(`Smartphone: ${this.nome}`);
        console.log(`Marca: ${this.marca}`);
        console.log(`Armazenamento: ${this.armazenamento}GB`);
        console.log(`Voltagem: ${this.voltagem}V`);
        console.log(`Estado: ${this.ligado ? 'Ligado' : 'Desligado'}`);
        console.log('---------------------');
    }
}

const pcGaming = new Computador("PC Gamer", "Intel i7", 16);
const pcEscritorio = new Computador("PC Escritório", "AMD Ryzen 5", 8);
const meuSmartphone = new Smartphone("Galaxy S21", "Samsung", 128);

pcGaming.ligar();
pcGaming.info();

pcEscritorio.info();

meuSmartphone.ligar();
meuSmartphone.info();
