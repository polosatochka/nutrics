import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { CustomerType } from "./CustomerType";
import { HTTPError } from "ky";
import React from "react";
import { Button, Form, Input, Modal } from 'antd';
import { api } from "./api";


export const AddCustomerButton: React.FC = React.memo(() => {
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();
    const [form] = Form.useForm(); //инстанс формы
  
  
      //Подход с использованием мутаций
    const mutation = useMutation<CustomerType, HTTPError, CustomerType>({
    mutationFn: (customer) => 
    api
    .post("customers",  {
      json: {tag: false, ...customer},
    })
    .json<CustomerType>(),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["customers"]}); //инвалидация кэша по ключу, запросы выполняются заново
      setOpen(false);
      form.resetFields()
    },
  });

  return (
    <>
      <Button style={{ margin: 10 }} onClick={() => setOpen(true)}>
        Добавить
      </Button>

      <Modal
        title="Новый клиент"
        open={open}
        onOk={form.submit}
        onCancel={() => {
            setOpen(false)  //закрытие окна          
            form.resetFields() //сброс значений полей
        }}
      >
        <Form<CustomerType>
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={mutation.mutate}
        //   onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<CustomerType>
            label="Имя"
            name="firstName"
            rules={[{ required: true, message: "Введите имя" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<CustomerType>
            label="Фамилия"
            name="lastName"
            rules={[{ required: true, message: "Введите фамилию" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<CustomerType>
            label="Возраст"
            name="age"
            rules={[{ required: true, message: "Введите возраст" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item hidden>
            <Button htmlType="submit" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
});