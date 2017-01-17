Vue.filter('doneLabel', function(value){
    if (value == 0){
        return "Não paga";
    }
    else {
        return "Paga";
    }
});

var app = new Vue({
    el: "#app",
    data: {
        title: "Contas a Pagar",
        menus: [
            {id:0, name: "Listar contas"},
            {id:1, name: "Criar contas"},
        ],
        activedView: 0,
        formType: 'insert',
        status_label: "gray",
        bill: {
            date_due:'',
            name:'',
            value:0,
            done:0,
        },
        names: [
            'Conta de Luz',
            'Conta de Água',
            'Conta de Telefone',
            'Supermercado',
            'Cartão de Crédito',
            'Empréstimo',
            'Gasolina'
        ],
        bills: [
            {date_due: '20/08/2016', name: 'Conta de luz', value:70.99, done:1},
            {date_due: '21/08/2016', name: 'Conta de água', value:55.99, done:0},
            {date_due: '22/08/2016', name: 'Conta de telefone', value:55.99, done:0},
            {date_due: '23/08/2016', name: 'Supermercado', value:625.99, done:0},
            {date_due: '24/08/2016', name: 'Cartão de crédito', value:1500.99, done:0},
            {date_due: '25/08/2016', name: 'Empréstimo', value:2000.99, done:0},
            {date_due: '26/08/2016', name: 'Gasolina', value:25.99, done:0},
        ]
    },
    computed: {
        status: function(){
            var count = 0;
            for (var i in this.bills){
                if (!this.bills[i].done){
                    count++;
                }
            }
            if (this.bills.length == 0) {
                this.status_label = "gray";
                return "Nenhuma conta cadatrada";
            }
            else {
                if (!count) {
                    this.status_label = "green";
                    return "Nenhuma conta a pagar";
                } else {
                    this.status_label = "red";
                    return "Existem "+count+" a serem pagas";
                }
            }

        }
    },
    methods: {
        showView: function(id) {
            this.activedView = id;
            if (id == 1) {
                this.formType = 'insert';
            }
        },
        submit: function() {
            if (this.formType == 'insert') {
                this.bills.push(this.bill);
            }

            this.bill = {
                date_due:'',
                    name:'',
                    value:0,
                    done:0,
            };

            this.activedView = 0;

        },
        loadBill: function(bill) {
            this.bill = bill;
            this.activedView = 1;
            this.formType = 'update';
        },
        deleteBill: function (bill) {
            check = confirm("Deseja realmente remover a conta: "
                + bill.name + " de vencimento: "
                + bill.date_due + " no valor de: "
                + bill.value + " ?")

            if (check == true) {
                toremove = this.bills.indexOf(bill);
                this.bills.splice(toremove, 1);
            }
        },
        changeStatus: function(bill) {
            this.bill = bill;
            this.bill.done = !bill.done;
        }
    }
});
