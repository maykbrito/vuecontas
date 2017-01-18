
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
    created: function () {
        if (this.$route.name == 'bill.update') {
            this.formType = 'update';
            this.getBill(this.$route.params.index);
            return;
        }
        this.formType = 'insert';
    },
    methods: {
        submit: function() {
            if (this.formType == 'insert') {
                this.$root.$children[0].billsPay.push(this.bill);
            }

            this.bill = {
                date_due:'',
                name:'',
                value:0,
                done:0,
            };

            this.$router.go({name: 'bill.list'});
        },
        getBill: function (index) {
            this.bill = this.$root.$children[0].billsPay[index];

        }
    },
});
