<script setup lang="ts">
import { CircleUser, Home, Menu, Package2, Search } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useAuthStore } from '@/Store/Auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = async () => {
    await authStore.logout();
}

</script>

<template>
    <div class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div class="hidden border-r bg-muted/40 md:block">
            <div class="flex h-full max-h-screen flex-col gap-2">
                <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <RouterLink to="/" class="flex items-center gap-2 font-semibold">
                        <Package2 class="h-6 w-6" />
                        <span class="">Panel Admin</span>
                    </RouterLink>
                </div>
                <div class="flex-1">
                    <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
                        <RouterLink to="/"
                            class="flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary">
                            <Home class="h-4 w-4" />
                            Inicio
                        </RouterLink>

                    </nav>
                </div>
            </div>
        </div>
        <div class="flex flex-col">
            <header class="flex h-14 items-center justify-end gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                <Sheet>
                    <SheetTrigger as-child>
                        <Button variant="outline" size="icon" class="shrink-0 md:hidden">
                            <Menu class="h-5 w-5" />
                            <span class="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" class="flex flex-col">
                        <nav class="grid gap-2 text-lg font-medium">
                            <RouterLink to="/" class="flex items-center gap-2 text-lg font-semibold">
                                <Package2 class="h-6 w-6" />
                                <span class="sr-only">Acme Inc</span>
                            </RouterLink>
                            <RouterLink to="login"
                                class="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground">
                                <Home class="h-5 w-5" />
                                Inicio
                            </RouterLink>
                        </nav>
                    </SheetContent>
                </Sheet>
                <div v-if="router.currentRoute.value.path == '/'" class="w-full flex-1">
                    <form>
                        <div class="relative">
                            <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input type="search" placeholder="Buscar Usuario ..."
                                class="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3" />
                        </div>
                    </form>
                </div>
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