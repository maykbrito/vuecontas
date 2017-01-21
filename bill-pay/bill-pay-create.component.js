
window.billPayCreateComponent = Vue.extend({
    template: `
    <div class="criarcontas">
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
            <input type="submit" value="Enviar">
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
    created: function () {
        if (this.$route.name == 'bill-pay.update') {
            this.formType = 'update';
            this.getBill(this.$route.params.id);
            return;
        }
        this.formType = 'insert';
    },
    methods: {
        submit: function() {
            let self = this;
            if (this.formType == 'insert') {
                Bill.save({},this.bill).then(function(response){
                    self.$dispatch('change-info');
                    self.$router.go({name: 'bill-pay.list'});
                })
            }else {
                Bill.update({id: this.bill.id}, this.bill).then(function(response){
                    self.$dispatch('change-info');
                    self.$router.go({name: 'bill-pay.list'});
                })
            }
        },
        getBill: function (id) {
            var self = this;
            Bill.get({id: id}).then(function(response){
                self.bill = response.data;
            })
        }
    },
});
