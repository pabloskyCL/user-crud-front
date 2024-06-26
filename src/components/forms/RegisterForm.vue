<script setup lang="ts">
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod'
import { useForm } from 'vee-validate';

const formSchema = toTypedSchema(z.object({
    firstName: z.string({
        required_error: "Nombre es obligatorio"
    }),
    lastName: z.string({
        required_error: "Apellido es obligatorio"
    }),
    email: z.string({
        required_error: "El campo email es obligatorio"
    }).email(),
    password: z.string({
        required_error: "Contraseña es obligatorio"
    }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_\-\/])([A-Za-z\d@$!%*?&.#_\-\/]|[^ ]){8,15}$/,{message: 'Contraseña con formato invalido'})
}))

const form = useForm({
    validationSchema: formSchema
})

const onSubmit = form.handleSubmit((values) => {
    console.log(values)
})

</script>

<template>
    <form @submit.prevent="onSubmit" id="register-form" class="grid gap-4">
        <div class="grid grid-cols-2 gap-4">
            <div class="grid gap-2">
                <FormField v-slot="{ componentField }" name="firstName">
                    <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="Pedro" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
            </div>
            <div class="grid gap-2">
                <FormField v-slot="{ componentField }" name="lastName">
                    <FormItem>
                        <FormLabel>Apellido</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="Pereira" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
            </div>
        </div>
        <div class="grid gap-2">
            <FormField v-slot="{ componentField }" name="email">
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input type="email" placeholder="Pereira" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
        </div>
        <div class="grid gap-2">
            <FormField v-slot="{ componentField }" name="password">
                <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input type="password" placeholder="Contraseña" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
        </div>
        <Button form="register-form" type="submit" class="w-full">
            Crear cuenta.
        </Button>
    </form>
</template>