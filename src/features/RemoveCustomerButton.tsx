import React from "react";
import { CustomerType } from "./CustomerType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { api } from "./api";

export const RemoveCustomerButton: React.FC<{
    customer: CustomerType;
}> = React.memo(({ customer })=>{
    const queryClient = useQueryClient()

    // //Подход с использованием мутаций
    const mutation = useMutation({
        mutationFn: () => api.delete(`customers/${customer.id}`),       
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['customers'] })
        },        
    })

    return <>
        <Button onClick={() => mutation.mutate()} icon={<DeleteOutlined />} title='Удалить' />
        {mutation.error}
    </>
})