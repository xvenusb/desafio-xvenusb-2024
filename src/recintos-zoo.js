class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
            { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: [] },
            { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
            { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: [] },
            { numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] }
        ];

        this.animais = {
            LEAO: { tamanho: 3, bioma: 'savana' },
            LEOPARDO: { tamanho: 2, bioma: 'savana' },
            CROCODILO: { tamanho: 3, bioma: 'rio' },
            MACACO: { tamanho: 1, bioma: 'savana ou floresta' },
            GAZELA: { tamanho: 2, bioma: 'savana' },
            HIPOPOTAMO: { tamanho: 4, bioma: 'savana ou rio' }
        };
    }

    validarEntrada(animal, quantidade) {
        if (!this.animais[animal]) {
            return "Animal inválido";
        }
        if (quantidade <= 0) {
            return "Quantidade inválida";
        }
        return null;
    }


    calcularEspacoOcupado(recinto, tipoAnimal, quantidade) {
        const espacoAnimal = this.animais[tipoAnimal].tamanho;


        const mesmaEspecie = recinto.animais.every(animal => animal.especie === tipoAnimal);

        const espacoExtra = mesmaEspecie ? 0 : 1

        const espacoJaOcupado = recinto.animais.reduce((acc, animal) => {
            const espacoAnimal = this.animais[animal.especie].tamanho;
             acc += espacoAnimal * animal.quantidade;
            return acc
        }, 0) ?? 0;

        const espacoUtilizado =  quantidade * espacoAnimal + espacoExtra;

        return espacoUtilizado + espacoJaOcupado;
    }

    validarBioma(recinto, animal) {

        const animalBioma = this.animais[animal].bioma;

        const unicoBioma = animalBioma.split(" ").length === 1;
        if(unicoBioma) {
            return recinto.bioma === animalBioma;
        }

        const recintoBioma = new Set(recinto.bioma.split(/\s+/));
        const biomaAnimal = animalBioma.split(/\s+/);

        return biomaAnimal.some(word => recintoBioma.has(word));

    }
    validatPredadtor(recinto, animal) {
        const predators = ['LEAO', 'LEOPARDO', 'CROCODILO'];

        const hasPredators = predators.some(predator => recinto.animais.some(animal => animal.especie === predator));

        if(hasPredators) {
            return predators.includes(animal);
        }

        return true;
    }

    analisaRecintos(animal, quantidade) {
        const erro = this.validarEntrada(animal, quantidade);
        if (erro) {
            return { erro };
        }

        const recintosViaveis = this.recintos.filter(recinto => {

            const biomaAdequado = this.validarBioma(recinto, animal);

                if (!biomaAdequado) return false;


                const especieAdaptada = this.validatPredadtor(recinto, animal);

                if(!especieAdaptada) return false;

            const espacoOcupado = this.calcularEspacoOcupado(recinto, animal, quantidade);

            return espacoOcupado <= recinto.tamanhoTotal;
        }).map(recinto => {

            const espacoAOcupar = this.calcularEspacoOcupado(recinto, animal, quantidade);

            const espacoLivre = recinto.tamanhoTotal - espacoAOcupar


            return  espacoLivre > 0  ? {
                numero: recinto.numero,
                espacoLivre,
                tamanhoTotal: recinto.tamanhoTotal
            }: null
        }).filter(recinto => recinto !== null);


        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }



        console.log({
            recintosViaveis
        })
        return {
            recintosViaveis: recintosViaveis.map(({ numero, espacoLivre, tamanhoTotal }) =>
                `Recinto ${numero} (espaço livre: ${espacoLivre} total: ${tamanhoTotal})`
            )
        };
    }
}

export { RecintosZoo };