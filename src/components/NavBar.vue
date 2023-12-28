
<template>
    <div class="card">
        <TabMenu :model="items" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            items: [
                {
                    label: 'Dashboard', icon: 'pi pi-home', command: () => {
                        this.$router.push('/');
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

            ]
        }
    }
}
</script>
