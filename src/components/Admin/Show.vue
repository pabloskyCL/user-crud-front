<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CircleUser } from 'lucide-vue-next'
import Avatar from '@/components/ui/avatar/Avatar.vue'
import AvatarFallback from '@/components/ui/avatar/AvatarFallback.vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/Store/Auth'
import { useToast } from '../ui/toast'
import { onMounted, reactive, ref } from 'vue'

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const { toast } = useToast();
const loading = ref(true);

let user = reactive<{
    id: number | undefined | null,
    name: string,
    email: string,
    roles: []
}>({
    id: undefined,
    name: '',
    email: '',
    roles: []
});

onMounted(async () => {
    await axios.get('http://localhost/api/user/' + route.params.id, {
        headers: {
            Authorization: 'Bearer ' + authStore.token,
            Accept: 'application/json'
        }
    }).then(({ data }) => {
        user = data.data
    }).catch(({ response }) => {
        router.push('/').then(() => {
            toast({
                title: response.data.message,
                variant: 'destructive'
            })
        });

    })
    loading.value = false;
})

</script>

<template>
    <Card v-if="!loading">
        <CardHeader>
            <CardTitle>Mis Datos</CardTitle>
            <CardDescription>
                Revisa tus datos, también tienes la opcion de editarlos
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Card className="flex flex-col items-center justify-center h-full w-full max-w-2xl mx-auto p-8">
                <div className="flex items-center w-full">
                    <div className="flex justify-center w-full">
                        <Avatar className="mb-4 w-32 h-32">
                            <AvatarFallback>
                                <CircleUser class="w-32 h-32" />
                            </AvatarFallback>
                        </Avatar>
                    </div>
                </div>
                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold">{{ user?.name }}</h2>
                    <p className="text-muted-foreground">{{ user?.email }}</p>
                    <div>
                        Roles:<Badge v-for="rol in user?.roles">
                            {{ rol ?? 'User' }}
                        </Badge>
                    </div>
                    <p className="text-sm max-w-[400px] text-muted-foreground">
                        Usuario creado en:
                    </p>
                </div>
                <div className="mt-6 w-full flex justify-center">
                    <Button>
                        <RouterLink :to="`/edit/${user.id}`">Editar</RouterLink>
                    </Button>
                </div>
            </Card>
        </CardContent>
    </Card>
</template>