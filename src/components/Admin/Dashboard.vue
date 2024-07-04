<script setup lang="ts">
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { MoreHorizontal, LoaderCircle } from 'lucide-vue-next'
import { onMounted, ref } from 'vue'
import { useUser } from '@/composables/useUser'
import Toaster from '../ui/toast/Toaster.vue'

const { usersList, deleteUser } = useUser();

const users = ref();
const loading = ref(true);

onMounted(async () => {
    const res = await usersList().finally(() => {
        loading.value = false;
    });

    users.value = res?.data.data
})

const handleDelete = async (id: number) => {
    loading.value = true;
    await deleteUser(id).then(async () => {
        const res = await usersList()
        users.value = res?.data.data
    }).finally(() => {
        loading.value = false;
    })
}

const createAt = (date: string) => {
    const newDate = new Date(Date.parse(date));
    return newDate.toLocaleDateString('es-CL', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
}

</script>

<template>
    <main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <Card>
            <CardHeader>
                <CardTitle>Listado de usuarios</CardTitle>
                <CardDescription>
                    administra los usuarios de la plataforma puedes: ver, editar, eliminar
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table v-if="!loading">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead class="hidden md:table-cell">Email</TableHead>
                            <TableHead class="hidden md:table-cell">
                                Creado en
                            </TableHead>
                            <TableHead>
                                Acciones
                                <span class="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow v-for="user in users">
                            <TableCell class="font-medium">
                                {{ user.name }}
                            </TableCell>
                            <TableCell>
                                <Badge v-for="role in user.roles" variant="outline">
                                    {{ role }}
                                </Badge>
                            </TableCell>
                            <TableCell class="hidden md:table-cell">
                                {{ user.email }}
                            </TableCell>
                            <TableCell class="hidden md:table-cell">
                                {{ createAt(user.created_at) + ' hrs' }}
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger as-child>
                                        <Button aria-haspopup="true" size="icon" variant="default">
                                            <MoreHorizontal class="h-4 w-4" />
                                            <span class="sr-only">Toggle menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                        <RouterLink :to="`/show/${user.id}`">
                                            <DropdownMenuItem>
                                                Ver
                                            </DropdownMenuItem>
                                        </RouterLink>
                                        <RouterLink :to="`/edit/${user.id}`">
                                            <DropdownMenuItem>
                                                Editar
                                            </DropdownMenuItem>
                                        </RouterLink>
                                        <DropdownMenuItem @click="handleDelete(user.id)">Eliminar</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <LoaderCircle class="animate-spin items-center justify-center h-20 w-20" v-else />
            </CardContent>
        </Card>
        <Toaster />
    </main>
</template>