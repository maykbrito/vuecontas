
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
                <td><a v-link="{name: 'bill-pay.update', params: {index: index}}">Editar</a> | <a href="#" class="naopago" @click.prevent="deleteBill(o)">X</a> </td>
            </tr>
    
        </tbody>
    </table>
    `,
    data: function(){
        return {
            bills: this.$root.$children[0].billsPay
        }
    },
    methods: {
        deleteBill: function (bill) {
            if (confirm("Deseja realmente remover a conta: "
                + bill.name + " de vencimento: "
                + bill.date_due + " no valor de: "
                + bill.value + " ?")) {
                this.$root.$children[0].billsPay.$remove(bill);
            }
        },
        changeStatus: function(bill) {
            this.$parent.bill = bill;
            this.$parent.bill.done = !bill.done;
        }
    },
});
