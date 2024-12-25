<script setup lang="ts">
import SocialBTN from '~/components/ui/Auth/SocialBTN.vue';

type PAYLOAD = {
    name: string;
    email: string;
    password: string;
}

const form = ref<PAYLOAD>({
    name: '',
    email: '',
    password: '',
})

const onSubmit = async () => {
  try {
    console.log('Submitting form:', form.value);

    await $fetch('/api/auth/register', {
      method: 'POST',
      body: form.value,
    });

    navigateTo('/');
  } catch (error) {
    console.error('Error during submission:', error);
  }
};


</script>


<template>
    <div class="flex flex-col justify-center items-center min-h-screen">
        <div class="w-full max-w-md">
            <form @submit.prevent="onSubmit" action="">
            <Card class="">
                    <CardHeader>
                    <CardTitle class="text-2xl">
                        Register
                    </CardTitle>
                    <CardDescription>
                        Enter your email below to create  your account.
                    </CardDescription>
                    </CardHeader>
                    <CardContent class="grid gap-4">
                        <div class="grid gap-2">
                        <Label for="name">Name</Label>
                        <Input id="name" type="text" placeholder="Name"
                        v-model="form.name"/>
                    </div>
                    <div class="grid gap-2">
                        <Label for="email">Email</Label>
                        <Input id="email" type="email" placeholder="m@example.com" required
                        v-model="form.email"/>
                    </div>
                    <div class="grid gap-2">
                        <Label for="password">Password</Label>
                        <Input id="password" type="password" required 
                        v-model="form.password"/>
                    </div>
                    <div class="grid grid-cols-1">
                        <SocialBTN icon="radix-icons:github-logo" label="Github"> </SocialBTN>
             
                    </div>
                    </CardContent>
                    <CardFooter class="flex-col space-y-2">
                    <Button class="w-full" type="submit">
                        Resgister
                    </Button>
                    <p> 
                        Already have an account?

                        <NuxtLink to="/auth/login" class="border-b border-gray-500 text-muted-foreground hover:text-primary">

                            Login

                        </NuxtLink>
                    </p>
                    </CardFooter>
                </Card>
        </form>
        </div>
    </div>
  
</template>



<style scoped>

</style>