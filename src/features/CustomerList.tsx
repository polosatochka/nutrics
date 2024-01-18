import { useQuery } from "@tanstack/react-query";
import React from "react";
import { CustomerType } from "./CustomerType";
import { Space, Table, Tag, Switch } from "antd";
import { RemoveCustomerButton } from "./RemoveCustomerButton";
import { api } from "./api";




export const CustomerList: React.FC = React.memo(() => {

    const { Column, ColumnGroup } = Table;

    const { data: customers } = useQuery({
        queryKey: ["customers"], 
        queryFn: () => api.get("customers").json<CustomerType[]>(),
        refetchInterval: 1000
    });

    return  <Table dataSource={customers}>
        <ColumnGroup title="Клиент">
        <Column title="Имя" dataIndex="firstName" key="firstName" />
        <Column title="Фамилия" dataIndex="lastName" key="lastName" />
      </ColumnGroup>
      <Column title="Возраст" dataIndex="age" key="age" />
      <Column
      title="Статус"
      dataIndex="tags"
      key="tags"
      render={(tags: boolean) => 
        tags ? ( <Tag color="green">Активный</Tag>) : (<Tag color="volcano">Неактивный</Tag>)
      }
      />
       <Column
      title="Действия"
      key="actions"
      render={(_, customer) => (
        <Space size="middle">
         <RemoveCustomerButton customer={customer} />
        </Space>
      )}
    />
    </Table>;
});

//<RemoveCustomerButton customer={customer} />

//-----------Switch--------------
// import React from 'react';
// import { Switch } from 'antd';

// const onChange = (checked: boolean) => {
//   console.log(`switch to ${checked}`);
// };

// const App: React.FC = () => <Switch defaultChecked onChange={onChange} />; Переключатель

// export default App;
//-----------Switch--------------

//------------Table---------
//const App: React.FC = () => (
//     return
//     <Table dataSource={clients}>
//       <ColumnGroup title="Клиент">
//         <Column title="Имя" dataIndex="firstName" key="firstName" />
//         <Column title="Фамилия" dataIndex="lastName" key="lastName" />
//       </ColumnGroup>
//       <Column title="Возраст" dataIndex="age" key="age" />
//       <Column
//         title="Статус"
//         dataIndex="tags"
//         key="tags"
//         render={(tags: boolean) => 
//             tags ? ( <Tag color="green">Активный</Tag>) : (<Tag color="volcano">Неактивный</Tag>)}
       
//     </Table>
//   });
  
 // export default App;
 //------------Table---------

 //-------------SimpleTable------
// const columns = [
//     {
//         title: 'Имя',
//         dataIndex: 'name', 'surname',
//         key: 'name',
//       },
//       {
//         title: 'Возраст',
//         dataIndex: 'age',
//         key: 'age',
//       },
//       {
//         title: 'Статус клиента',
//         dataIndex: 'status',
//         key: 'address',
//       }]
 //-------------SimpleTable------;