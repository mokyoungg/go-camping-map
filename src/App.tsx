import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BasedList from "./components/BasedList/BasedList";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BasedList />
    </QueryClientProvider>
  );
}

export default App;
