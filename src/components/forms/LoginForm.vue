<script setup lang="ts">
import { FormField } from '@/components/ui/form';
import FormControl from '@/components/ui/form/FormControl.vue';
import FormItem from '@/components/ui/form/FormItem.vue';
import FormLabel from '@/components/ui/form/FormLabel.vue';
import FormMessage from '@/components/ui/form/FormMessage.vue';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/Store/Auth';
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate';
import { Toaster } from '@/components/ui/toast';
import { useToast } from '@/components/ui/toast/use-toast';
import * as z from 'zod'

const authStore = useAuthStore()
const { toast } = useToast();

const formSchema = toTypedSchema(z.object({
    email: z.string().email(),
    password: z.string()
}))

const form = useForm({
    validationSchema: formSchema
})

const onSubmit = form.handleSubmit((values) => {
    authStore.login({
        email: values.email,
        password: values.password
    }).catch((error) => {
        toast({
            title: error.response.data.message,
            variant: 'destructive'
        })
    });

})
</script>

<template>
    <form class="grid gap-4" id="login-form" @submit.prevent="onSubmit">
        <div class="grid gap-2">
            <FormField v-slot="{ componentField }" name="email">
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="email" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
        </div>
        <div class="grid gap-2">
            <FormField v-slot="{ componentField }" name="password">
                <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                        <Input type="password" placeholder="contraseña" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
        </div>
    </form>
    <Toaster />
</template>