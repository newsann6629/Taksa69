<template>
    <div>
        {{ data }}
    </div>
</template>

<script setup>
    const {data} = useFetch('/api/db-test.get')
</script>

<style lang="scss" scoped>

</style>