<template>
    <main class="container">
        <b-table striped hover :items="customers"></b-table>
    </main>
</template>

<script>
export default {
    name: 'index',
    data: function() {	
        return {
            customers: []
        }
    },
    created(){
        this.init()
    },
    methods: {
        async init(){
            let list = await this.axios.post('/list');
            this.customers = list.customers
        }
    }
}
</script>

<style scoped>

</style>