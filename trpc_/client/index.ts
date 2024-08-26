import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server';


const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
     url: 'https://crispy-zebra-7v7xjrw5rgwxcpvvr-3000.app.github.dev/',
     headers :{
      "authorization" :"bearer 123"
     }
    }),
  ],
});

async function main(){
  let res = await trpc.getTodo.query()
  let res2 = await trpc.createTodo.mutate({
    title:"dance",
    description:"gotta dance",
    done:true,
    userId: 1
  })

  console.log(res)
}
main()