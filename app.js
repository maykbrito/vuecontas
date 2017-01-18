Vue.filter('doneLabel', function(value){
    if (value == 0){
        return "Não paga";
    }
    else {
        return "Paga";
    }
});

// COMPONENTS
// =================================
var menuComponent = Vue.extend({
    template: `
    <nav>
        <ul>
            <li v-for="o in menus">
                <a href="#" @click.prevent="showView(o.id)"> {{o.name}} </a>
            </li>
        </ul>
    </nav>
    `,
    data: function() {
        return {
            menus: [
                {id:0, name: "Listar contas"},
                {id:1, name: "Criar contas"},
            ],
        }
    },
    methods: {
        showView: function(id) {
            this.$dispatch('change-activedview', id);
            if (id == 1) {
                this.$dispatch('change-formtype', 'insert');
            }
        },
    }
});

var billListComponent = Vue.extend({
    template: `
    <style type="text/css">
        .pago{
            color:limegreen;
        }
        .naopago{
            color:red;
        }
    </style>
    <table border="1" cellpadding="10" v-if="$parent.activedView==0">
        <thead>
        <tr>
            <th>#</th>
            <th>Vencimento</th>
            <th>Nome</th>
            <th>Valor</th>
            <th>Paga?</th>
            <th>Action</th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="(index,o) in bills">
                <td>{{index +1}}</td>
                <td>{{ o.date_due }}</td>
                <td>{{ o.name }}</td>
                <td>{{ o.value | currency 'R$ ' }}</td>
                <td ><a href="#" @click.prevent="changeStatus(o)" :class="{'pago': o.done, 'naopago': !o.done}">{{ o.done | doneLabel }}</a></td>
                <td><a href="#" @click.prevent="loadBill(o)">Editar</a> | <a href="#" class="naopago" @click.prevent="deleteBill(o)">X</a> </td>
            </tr>
    
        </tbody>
    </table>
    `,
    data: function(){
        return {
            bills: [
                {date_due: '20/08/2016', name: 'Conta de Luz', value:70.99, done:1},
                {date_due: '21/08/2016', name: 'Conta de Água', value:55.99, done:0},
                {date_due: '22/08/2016', name: 'Conta de Telefone', value:55.99, done:0},
                {date_due: '23/08/2016', name: 'Supermercado', value:625.99, done:0},
                {date_due: '24/08/2016', name: 'Cartão de Crédito', value:1500.99, done:0},
                {date_due: '25/08/2016', name: 'Empréstimo', value:2000.99, done:0},
                {date_due: '26/08/2016', name: 'Gasolina', value:25.99, done:0},
            ]
        }
    },
    methods: {
        loadBill: function(bill) {
            this.$dispatch('change-bill', bill);
            this.$dispatch('change-activedview', 1);
            this.$dispatch('change-formtype', 'update');
        },
        deleteBill: function (bill) {
            check = confirm("Deseja realmente remover a conta: "
                + bill.name + " de vencimento: "
                + bill.date_due + " no valor de: "
                + bill.value + " ?")

            if (check == true) {
                this.bills.$remove(bill);
            }
        },
        changeStatus: function(bill) {
            this.$parent.bill = bill;
            this.$parent.bill.done = !bill.done;
        }
    },
    events: {
        'new-bill': function(bill) {
            this.bills.push(bill);
        }
    }
});

var billCreateComponent = Vue.extend({
   template: `
    <div class="criarcontas" v-if="$parent.activedView==1">
        <form name="form" @submit.prevent="submit">
            <table>
                <tr>
                    <td>Vencimento:</td>
                    <td><input type="text" v-model="bill.date_due"></td>
                </tr>
                <tr>
                    <td>Nome:</td>
                    <td><select v-model="bill.name">
                            <option v-for="o in names" :value="o"> {{ o }}</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Valor:</td>
                    <td><input type="text" v-model="bill.value"></td>
                </tr>
            </table>
            <br><br>
            <input type="submit" value="Enviar" @click="submit">
        </form>
    </div>
   `,
    data: function() {
        return {
            formType:'insert',
            names: [
                'Conta de Luz',
                'Conta de Água',
                'Conta de Telefone',
                'Supermercado',
                'Cartão de Crédito',
                'Empréstimo',
                'Gasolina'
            ],
            bill: {
                date_due:'',
                name:'',
                value:0,
                done:0,
            },
        }
    },
    methods: {
        submit: function() {
            if (this.formType == 'insert') {
                this.$dispatch('new-bill', this.bill);
            }
            this.$dispatch('change-activedview', 0);
        },
    },
    events: {
        'change-formtype': function(formType) {
            this.formType = formType;
        },
        'change-bill': function (bill) {
            this.bill = bill;
        }
    },
});

var appComponent = Vue.extend({
    components: {
        'menu-component': menuComponent,
        'bill-list-component': billListComponent,
        'bill-create-component': billCreateComponent
    },
    template: `
    <style type="text/css">
        .green {color:limegreen;}
        .red{color:red;}
        .gray {color:gray;}
    </style>
    <h1>{{ title }}</h1>
    <h3 :class="status_label">{{ status }}</h3>
    
    <menu-component></menu-component>
    <bill-list-component v-ref:bill-list-component></bill-list-component>
    <bill-create-component></bill-create-component>
    `,
    data: function () {
        return {
            title: "Contas a Pagar",
            activedView: 0,
            status_label: "gray"
        }
    },
    events: {
        'change-activedview': function(activedView) {
          this.activedView = activedView;
        },
        'change-formtype': function(formType) {
          this.$broadcast('change-formtype', formType);
        },
        'new-bill': function(bill) {
            this.$broadcast('new-bill', bill);
        },
        'change-bill': function (bill) {
            this.$broadcast('change-bill', bill);
        }
    },
    computed: {
        status: function(){
            var billListComponent = this.$refs.billListComponent;
            var count = 0;
            for (var i in billListComponent.bills){
                if (!billListComponent.bills[i].done){
                    count++;
                }
            }
            if (billListComponent.bills.length == 0) {
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
    }
});

// APP
// ==================================
var app = new Vue({
    components: {
        'app-component': appComponent
    },
    el: "#app"
});
