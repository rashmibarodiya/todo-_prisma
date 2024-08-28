import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server';


//console.log(process.env.SECRET! )

const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'https://crispy-zebra-7v7xjrw5rgwxcpvvr-3000.app.github.dev/',
      headers: {
        "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhvbGEiLCJpYXQiOjE3MjQ3NzU2MTUsImV4cCI6MTcyNDc3OTIxNX0.ZsnD3fCs313D_9YMldbFdia6HlZkt0sKqbFCW6vJTxs"
      }
    }),
  ],
});

async function main() {
  //  let res = await trpc.todo.getTodo.query()
  // let res2 = await trpc.createTodo.mutate({
  //   title:"dance",
  //   description:"gotta dance",
  //   done:true,
  //   userId: 1
  // })


  let res3 = await trpc.user.login.mutate({
    username : "hola",
    password : "123"
  })
  console.log(res3)
  let me = await trpc.user.me.query()
  console.log(me)
}
main()