<script setup lang="ts">
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import * as z from 'zod';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import type { role } from '@/Store/Auth';


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

defineProps<{
    roles: role[] | undefined
}>()

const editUserForm = useForm({
    validationSchema: editUserFormSchema,

})


const handleEditUser = editUserForm.handleSubmit((values) => {
    console.log(values)
})

</script>

<template>
   
</template>