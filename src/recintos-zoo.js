class RecintosZoo {


  erro = null;
  recintosViaveis = null


  recintosExistentes = [
    {numero: 1, bioma:'savana', TamanhoTotal: 10, AnimaisExistentes: ['macaco', 'macaco', 'macaco'] },
    {numero: 2, bioma:'floresta', TamanhoTotal: 5, AnimaisExistentes:[] },
    {numero: 3, bioma: 'savana e rio', TamanhoTotal: 5, AnimaisExistentes:['gazela']},
    {numero: 4, bioma: 'rio', TamanhoTotal: 8, AnimaisExistentes:[]},
    {numero: 5, bioma:'savana', TamanhoTotal: 9, AnimaisExistentes:['Leão']}
];


  animais = [
    {especie: 'LEAO', tamanho: 3, bioma:'savana'},
    {especie:'LEOPARDO', tamanho:2, bioma: 'savana'},
    {especie:'CROCODILO', tamanho:3, bioma:'rio'},
    {especie:'MACACO', tamanho:1, bioma:'savana ou floresta'},
    {especie:'GAZELA', tamanho: 2, bioma:'savana'},
    {especie:'HIPOPOTAMO', tamanho:4, bioma:'savana ou rio'}
];

    analisaRecintos(animal, quantidade) {

        if(quantidade == 0 ) {
            return  {
                erro: "Quantidade inválida"
            }
        }

        const animalExists = this.animais.find(item =>  {
            return item.especie === animal;
        })
    

        if(!animalExists) {
           return {
            erro: 'Animal inválido',
            recintosViaveis: null
           }
        }

        
    }

}


export { RecintosZoo as RecintosZoo };
