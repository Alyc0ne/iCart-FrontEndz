export default {
    data() {
        
    },
    mounted() {
        console.log('this is a global mixins')
    },
    methods: {
        numberWithCommas(x) {
            return parseFloat(x).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        },
        callAlert(x) {
            this.$store.dispatch("callAlert", x)
        }
    }
}