<script setup lang="ts">
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import * as z from 'zod';
import { Form, Field } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';


const editPasswordSchema = toTypedSchema(z.object({
    password: z.string({
        required_error: 'contraseña es obligatorio'
    }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_\-\/])([A-Za-z\d@$!%*?&.#_\-\/]|[^ ]){8,15}$/, 'formato de contraseña invalido')
}))

const handleEditPassword = (values: any) => {
    console.log(values)
}

</script>

<template>
    <Card>
        <CardHeader>
            <CardTitle>Cambiar contraseña</CardTitle>
        </CardHeader>
        <CardContent>
            <Form id="edit-password-form" :validation-schema="editPasswordSchema" class="flex flex-col gap-4"
                @submit="handleEditPassword">
                <Field name="password" v-slot="{ componentField, errorMessage }">
                    <Input type="text" placeholder="contraseña nueva" v-bind="componentField" />
                    <span class="text-red-600">{{ errorMessage }}</span>
                </Field>
            </Form>
        </CardContent>
        <CardFooter class="border-t px-6 py-4">
            <Button type="submit" form="edit-password-form">Guardar</Button>
        </CardFooter>
    </Card>
</template>