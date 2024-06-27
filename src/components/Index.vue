<script setup lang="ts">

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { MoreHorizontal } from 'lucide-vue-next'
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
        <Table>
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
            <TableRow>
              <TableCell class="font-medium">
                Laser Lemonade Machine
              </TableCell>
              <TableCell>
                <Badge variant="outline">
                  Draft
                </Badge>
              </TableCell>
              <TableCell class="hidden md:table-cell">
                pabloskiquiorz@gmail.com
              </TableCell>
              <TableCell class="hidden md:table-cell">
                2023-07-12 10:42 AM
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
                    <DropdownMenuItem>Ver</DropdownMenuItem>
                    <DropdownMenuItem>Editar</DropdownMenuItem>
                    <DropdownMenuItem>Eliminar</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div class="text-xs text-muted-foreground">
          Total <strong>1-10</strong> de <strong>32</strong>
          usuarios
        </div>
      </CardFooter>
    </Card>
  </main>
</template>
