<script setup lang="ts">
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';


</script>

<template>
    <form id="register-form" class="grid gap-4">
        <div class="grid grid-cols-2 gap-4">
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
                <Label for="last-name">Last name</Label>
                <Input id="last-name" placeholder="Robinson" required />
            </div>
        </div>
        <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div class="grid gap-2">
            <Label for="password">Password</Label>
            <Input id="password" type="password" />
        </div>
        <Button form="register-form" type="submit" class="w-full">
            Crear cuenta.
        </Button>
    </form>
</template>