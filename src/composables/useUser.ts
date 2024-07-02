import axios from "axios"
import { useAuthStore } from "@/Store/Auth"
import { useToast } from "@/components/ui/toast";

export type UserCreateForm = {
  name: string,
  email: string,
  password: string,
  role: string
}

export type UserUpdateForm = {
  name: string,
  email: string,
  role: string
}

export function useUser(){

    const authStore = useAuthStore();
    const { toast } = useToast();

    const usersList = async () => {
     return await axios.get('http://localhost/api/user', {
        headers: {
          Authorization: 'Bearer ' + authStore.token,
          Accept: 'application/json'
        }
      }).catch(({response}) => {
         toast({
          title: response.data.message,
          variant: 'destructive'
        });
      })
    }

    const saveUser = async (submitData: UserCreateForm) => {
      return await axios.post('http://localhost/api/user',submitData, {
        headers: {
          Authorization: 'Bearer '+ authStore.token,
          Accept: 'application/json'
        }
      })
    }

    const updateUser = async (submitData: UserUpdateForm) => {
      return await axios.put('http://localhost/api/user',submitData,{
        headers: {
          Authorization: 'Bearer '+ authStore.token,
          Accept: 'application/json'
        }
      }).then(({data}) => {
        toast({
          title: data.message,
          variant: 'default',
          class: 'bg-teal-600 text-white'
        })
      }).catch(({response}) => {
        toast({
          title: response.data.message,
          variant: 'destructive'
        })
      })
    }

    const changePassword = async (data: {
      userId: number,
      password: string
    }) => {
      return await axios.put('http://localhost/api/changePassword', data,{
        headers: {
          Authorization: 'Bearer '+ authStore.token,
          Accept: 'application/json'
        }
      }).then(({data}) => {
        toast({
          title: data.message,
          variant:'default',
          class: 'bg-teal-600 text-white'
        })
      }).catch(({response}) => {
        toast({
          title: response.data.message,
          variant: 'destructive'
        })
      })
    }

    const deleteUser = async (id: number) => {
      return await axios.delete('http://localhost/api/user',{data: {"id": id},
        headers: {
          Authorization: 'Bearer '+ authStore.token,
          Accept: 'application/json'
        }
      }).then(({data}) => {
        toast({
          title: data.message,
          variant: 'default',
          class: 'bg-teal-600 text-white'
        })
      }).catch(({response}) => {
        toast({
          title: response.data.message,
          variant: 'destructive'
        })
      })
    }

    return {
      usersList,
      saveUser,
      updateUser,
      deleteUser,
      changePassword
    }
}