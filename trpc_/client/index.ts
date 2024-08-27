import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server';


//console.log(process.env.SECRET! )

const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'https://crispy-zebra-7v7xjrw5rgwxcpvvr-3000.app.github.dev/',
      headers: {
        "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhvbGEiLCJpYXQiOjE3MjQ3NjQwNjIsImV4cCI6MTcyNDc2NzY2Mn0.iP58CYoqKy7uPtucT6e0ds_qNfwwtq4gZhNv61MLj24"
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


  // let res3 = await trpc.user.login.query({
  //   username : "hola",
  //   password : "123"
  // })
  let me = await trpc.user.me.query()
  console.log(me)
}
main()