
<template>
    <div class="card">
        <TabMenu :model="items" :active-index="active"/>
    </div>
    
</template>

<script>
export default {
    data() {
        return {
            active:0,
            
            items: [
            {
                    label: 'Login', icon: 'pi pi-home', command: () => {
                        this.$router.push('/login');
                    }
                },
                {
                    label: 'Registro', icon: 'pi pi-home', command: () => {
                        this.$router.push('/registro');
                    }
                },
                {
                    label: 'Dashboard', icon: 'pi pi-home', command: () => {
                        this.$router.push('/dashboard');
                    }
                },
                {
                    label: 'Empresas', icon: 'pi pi-chart-line', command: () => {
                        this.$router.push('/empresa');
                    }
                },
                {
                    label: 'Run', icon: 'pi pi-list', command: () => {
                        this.$router.push('/pdf');
                    }
                },
                {
                    label: 'Usuario', icon: 'pi pi-list', command: () => {
                        this.$router.push('/usuario');
                    }
                },

            ]
        }
    }
}
</script>
