import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Layout } from "antd"
import { CustomerList } from "./features/CustomerList";
import { AddCustomerButton } from "./features/AddCustomerButton";
import 'antd/dist/reset.css'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: true,
    },
    mutations: {
      onError(error) {
        console.error(error);
        alert(error);
      },
    },
  },
});

function App() {
 
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Layout.Header>
          
        </Layout.Header>
        <Layout.Content>
        <AddCustomerButton />
          <CustomerList />
          
        </Layout.Content>
      </Layout>
    </QueryClientProvider>
  );
}

export default App

// 1 Проблема с методом render
//2 Проблема с добавлением клиента 
//3 Кнопка удаления
