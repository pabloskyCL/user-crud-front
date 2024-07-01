<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/Store/Auth';
import type { role } from '@/Store/Auth';
import { useRoute } from 'vue-router';
import ChangePasswordForm from '../forms/ChangePasswordForm.vue';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import * as z from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useUser } from '@/composables/useUser';
import { Toaster } from '../ui/toast';

const { updateUser } = useUser();


let user = reactive<{
    id: number | undefined | null,
    name: string,
    email: string,
    role: []
}>({
    id: undefined,
    name: '',
    email: '',
    role: []
});
const roles = ref<role[]>();
const authStore = useAuthStore();
const loading = ref(true);
const route = useRoute();

onMounted(async () => {
    await axios.get('http://localhost/api/user/' + route.params.id, {
        headers: {
            Authorization: 'Bearer ' + authStore.token,
            Accept: 'application/json'
        }
    }).then(({ data }) => {
        user = data.data
        console.log(user.id)
    })

    await axios.get('http://localhost/api/role').then(({ data }) => {
        roles.value = data
    })

    loading.value = false;
})

const initialValues = computed(() => {

    const nameSplited = user.name.trimEnd().trimStart().split(' ')
    const firstName = nameSplited[0];
    const lastName = nameSplited[1];

    return {
        firstName: firstName,
        lastName: lastName,
        email: user.email
    }
})

const editUserFormSchema = toTypedSchema(z.object({
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
    })

}))

const handleEditUser = async (values: any) => {
    await updateUser({
        name: values.firstName + ' ' + values.lastName,
        email: values.email,
        role: values.role
    })
}



</script>

<template>
    <div v-if="!loading" class="grid gap-6 mt-8 max-w-3xl">
        <div>
            <h3 class="text-2xl font-medium">
                Editar Usuario.
            </h3>
            <p class="text-sm text-muted-foreground">
                modifica los campos y guarda la nueva información.
            </p>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Información general</CardTitle>
            </CardHeader>
            <CardContent>
                <Toaster />
                <Form id="edit-user-form" :validation-schema="editUserFormSchema" :validate-on-mount="false"
                    @submit="handleEditUser">
                    <div class="grid grid-cols-2 gap-4">
                        <div class="grid gap-2">

                            <FormField v-model="initialValues.firstName" v-slot="{ componentField }" name="firstName">
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
                            <FormField v-model="initialValues.lastName" v-slot="{ componentField }" name="lastName">
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
                    <FormField v-model="initialValues.email" v-slot="{ componentField }" name="email">
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="ej: email" v-bind="componentField" />
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
                                    <SelectItem v-for="role in roles" :key="role.name" :value="role.name ?? ''">
                                        {{ role.name }}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                </Form>
            </CardContent>
            <CardFooter class="border-t px-6 py-4">
                <Button type="submit" form="edit-user-form">Guardar</Button>
            </CardFooter>
        </Card>
        <ChangePasswordForm />
    </div>
</template>