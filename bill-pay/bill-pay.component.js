
window.billPayComponent = Vue.extend({
    components: {
        'menu-component': billPayMenuComponent,
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
    <router-view></router-view>    
    `,
    data: function () {
        return {
            title: "Contas a Pagar",
            status_label: "gray"
        }
    },
    computed: {
        status: function(){
            var bills = this.$root.$children[0].billsPay;

            var count = 0;
            for (var i in bills){
                if (!bills[i].done){
                    count++;
                }
            }
            if (bills.length == 0) {
                this.status_label = "gray";
                return "Nenhuma conta cadastrada";
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
