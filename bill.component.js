window.billComponent = Vue.extend({
    template: `
    <nav>
        <ul>
            <li v-for="o in menus">
                <a v-link="{name: o.routeName}"> {{o.name}} </a>
            </li>
        </ul>
    </nav>
    <router-view></router-view>
    `,
    data: function() {
        return {
            menus: [
                {name: "Contas a Pagar", routeName: 'bill-pay.list'},
                {name: "Contas a Receber", routeName: 'bill-receive'},
            ],
        }
    },
});
