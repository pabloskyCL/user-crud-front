<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import RegisterForm from './forms/RegisterForm.vue';
</script>

<template>
    <div class="w-full h-screen grid place-content-center">
        <Card class="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle class="text-xl">
                    Registro
                </CardTitle>
                <CardDescription>
                    Ingresa tus datos para crear una cuenta.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <RegisterForm></RegisterForm>
                <div class="mt-4 text-center text-sm">
                    ya tienes cuenta?.
                    <RouterLink to="login" class="underline">
                        Inicia Sesión
                    </RouterLink>
                </div>
            </CardContent>
        </Card>
    </div>
</template>