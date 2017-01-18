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
