import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import{ useState } from 'react';
import { trpc } from './utils/trpc';
import Index from './Index';

export default function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'https://crispy-zebra-7v7xjrw5rgwxcpvvr-3000.app.github.dev/',
          
          async headers() {
            return {
              authorization: "Bearer " + localStorage.getItem("token"),
            };
          },
        }),
      ],
    }),
  );

  return (<>
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Index/>
      </QueryClientProvider>
    </trpc.Provider>
    </>
  );
}


