<template>
    <div>
        Home Page
    </div>
    <pre>{{ user }}</pre>
    <NuxtLink to="/auth/login">Login</NuxtLink>
    <NuxtLink to="/auth/register">Register</NuxtLink>
    <NuxtLink to="/admin">Admin</NuxtLink>
    <NuxtLink to="/admin/categories">Categories</NuxtLink>
    <NuxtLink to="/admin/colors">Color</NuxtLink>
    <NuxtLink to="/admin/sizes">Sizes</NuxtLink>
    <NuxtLink to="/admin/products/new">Add Product</NuxtLink>






    <button @click="logout" >Logout</button>

</template>

<script setup lang="ts">

const {user, clear} = useUserSession();

definePageMeta({
    middleware: 'auth',
})

const logout = async () => {
    await clear();
    navigateTo('/auth/login');
}

</script>

<style scoped>

</style>