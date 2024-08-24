import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server';

const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
     url: 'https://crispy-zebra-7v7xjrw5rgwxcpvvr-3000.app.github.dev/',
    }),
  ],
});

async function main(){
  let res = await trpc.getTodo.query()

  console.log(res)
}
main()