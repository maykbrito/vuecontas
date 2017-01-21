/**
 * Created by maykbrito on 1/18/17.
 */
Vue.filter('doneLabel', function(value){

    if (value == 0){
        return "Não paga";
    }
    else {
        return "Paga";
    }
});

Vue.filter('statusGeneral', function(value){

    if (value === false) {
        return "Nenhuma conta cadastrada";
    }

    if (value === 0){
        return "Não existem contas a serem pagas";
    }
    else if (value == 1) {
        return "Você possui " + value + " conta a pagar";
    }
    else {
        return "Existem " + value + " contas a pagar";
    }
});
