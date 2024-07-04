<script setup lang="ts">
import { useAuthStore } from '@/Store/Auth';
import DropdownMenu from '@/components/ui/dropdown-menu/DropdownMenu.vue';
import DropdownMenuTrigger from '@/components/ui/dropdown-menu/DropdownMenuTrigger.vue';
import { Button } from '@/components/ui/button';
import { CircleUser, Package2 } from 'lucide-vue-next';
import DropdownMenuContent from '@/components/ui/dropdown-menu/DropdownMenuContent.vue';
import DropdownMenuLabel from '@/components/ui/dropdown-menu/DropdownMenuLabel.vue';
import DropdownMenuSeparator from '@/components/ui/dropdown-menu/DropdownMenuSeparator.vue';
import DropdownMenuItem from '@/components/ui/dropdown-menu/DropdownMenuItem.vue';

const authStore = useAuthStore();

const handleLogout = async () => {
    authStore.logout()
}

</script>

<template>
    <div class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div class="hidden border-r bg-muted/40 md:block">
            <div class="flex h-full max-h-screen flex-col gap-2">
                <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <RouterLink to="/" class="flex items-center gap-2 font-semibold">
                        <Package2 class="h-6 w-6" />
                        <span class="">{{ authStore.user?.name }}</span>
                    </RouterLink>
                </div>
            </div>
        </div>
        <div class="flex flex-col">
            <header class="flex h-14 items-center justify-end gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                <DropdownMenu v-if="authStore.user">
                    <DropdownMenuTrigger as-child>
                        <Button variant="secondary" size="icon" class="rounded-full">
                            <CircleUser class="h-8 w-8" />
                            <span class="sr-only">Toggle user menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>{{ authStore.user.name }}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>{{ authStore.user.email }}</DropdownMenuLabel>
                        <DropdownMenuItem @click="handleLogout">Cerrar sesión</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Button v-else>
                    <RouterLink to="login">Iniciar sesión</RouterLink>
                </Button>
            </header>
            <slot />
        </div>
    </div>

</template>