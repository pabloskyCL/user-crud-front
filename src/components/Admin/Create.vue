<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { Button } from '../ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import * as z from 'zod';
import { useForm } from 'vee-validate';
import { useUser } from '@/composables/useUser';
import { useToast } from '../ui/toast';
import { onMounted, ref } from 'vue';
import axios from 'axios';

const roles = ref([]);

const { toast } = useToast();
const { saveUser } = useUser();

onMounted(async () => {
    await axios.get('http://localhost/api/role').then(({ data }) => {
        roles.value = data
    })
})

const createUserFormSchema = toTypedSchema(z.object({
    firstName: z.string({
        required_error: 'nombre es obligatorio'
    }),
    lastName: z.string({
        required_error: 'apellido es obligatorio'
    }),
    email: z.string({
        required_error: 'email es obligatorio'
    }).email(),
    role: z.string({
        required_error: 'role es obligatorio'
    }),
    password: z.string({
        required_error: 'contraseña es obligatorio'
    }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_\-\/])([A-Za-z\d@$!%*?&.#_\-\/]|[^ ]){8,15}$/, { message: 'Contraseña con formato invalido' })
}))

const { handleSubmit } = useForm({
    validationSchema: createUserFormSchema
})

const onSubmit = handleSubmit((values) => {
    console.log(values);
    saveUser({
        name: values.firstName + ' ' + values.lastName,
        email: values.email,
        password: values.password,
        role: values.role
    }).then(() => {
        toast({
            title: 'Usuario creado con exito',
            variant: 'default',
            class: 'bg-teal-600 text-white'
        })
    }).catch(({ response }) => {
        toast({
            title: response.data.message,
            variant: 'destructive'
        })
    })
})


</script>

<template>
    <div class="flex-1 my-10 lg:max-w-2xl">
        <div class="space-y-6">

            <div>
                <h3 class="text-2xl font-medium">
                    Crear Usuario
                </h3>
                <p class="text-sm text-muted-foreground">
                    rellena los campos para crear un usuarios.
                </p>
            </div>
            <form class="space-y-8" @submit.prevent="onSubmit">
                <div class="grid grid-cols-2 gap-4">
                    <div class="grid gap-2">
                        <FormField v-slot="{ componentField }" name="firstName">
                            <FormItem>
                                <FormLabel>Nombre</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="ej: Pedro" v-bind="componentField" />
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
                                    <Input type="text" placeholder="ej: Pereira" v-bind="componentField" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                    </div>
                </div>

                <FormField v-slot="{ componentField }" name="email">
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="ej: email" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="password">
                    <FormItem>
                        <FormLabel>Contraseña</FormLabel>
                        <FormControl>
                            <Input type="password" placeholder="ej: 12asdD.t" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="role">
                    <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Select v-bind="componentField">
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecciona un role ..." />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem v-for="role in roles" :key="role" :value="role.name">
                                    {{ role.name }}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <div>

                </div>

                <div class="flex gap-2 justify-start">
                    <Button type="submit">
                        Crear Usuario
                    </Button>

                    <RouterLink to="/"><Button type="button" variant="outline">
                            Cancelar
                        </Button></RouterLink>
                </div>
            </form>
        </div>
    </div>
</template>