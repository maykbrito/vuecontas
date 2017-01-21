
window.billPayListComponent = Vue.extend({
    template: `
    <style type="text/css">
        .pago{
            color:limegreen;
        }
        .naopago{
            color:red;
        }
    </style>
    <table border="1" cellpadding="10">
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
                <td><a v-link="{name: 'bill-pay.update', params: {id: o.id}}">Editar</a> | <a href="#" class="naopago" @click.prevent="deleteBill(o)">X</a> </td>
            </tr>
    
        </tbody>
    </table>
    `,
    http: {
        root: 'http://192.168.10.10:8000/api'
    },
    data: function(){
        return {
            bills: this.$root.$children[0].billsPay
        }
    },
    created: function() {
        let self = this;
        Bill.query().then(function(response){
          self.bills = response.data;
      })
    },
    methods: {
        deleteBill: function (bill) {
            if (confirm("Deseja realmente remover a conta?")) {
                let self = this;
                Bill.delete({id: bill.id}, bill).then(function(response){
                    self.$dispatch('change-info');
                    self.bills.$remove(bill);
                })
            }
        },
        changeStatus: function(bill) {
            let self = this;
            bill.done = !bill.done;
            Bill.update({id: bill.id}, bill).then(function(response){
                self.$dispatch('change-info');
                self.$router.go({name: 'bill-pay.list'});
            })
        }
    },
});
