import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BasedList from "./components/BasedList/BasedList";
import Map from "./components/Map/Map";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <BasedList /> */}
      <Map />
    </QueryClientProvider>
  );
}

export default App;
