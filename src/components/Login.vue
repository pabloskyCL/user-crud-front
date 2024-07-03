<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import LoginForm from './forms/LoginForm.vue';
</script>

<template>
  <div class="grid w-full h-screen place-content-center">
    <Card class="w-full max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl">
          Iniciar Sesión
        </CardTitle>
        <CardDescription>
          Ingresa tu email y contraseña para iniciar sesión.
        </CardDescription>
      </CardHeader>
      <CardContent class="">
        <LoginForm></LoginForm>
        <div class="mt-4 text-center text-sm">
          aun no tienes cuenta?.
          <RouterLink to="/register" class="underline">
            Registrate
          </RouterLink>
        </div>
      </CardContent>
      <CardFooter>
        <Button type="submit" form="login-form" class="w-full">
          Iniciar Sesión
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>