import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server';


//console.log(process.env.SECRET! )

const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
     url: 'https://crispy-zebra-7v7xjrw5rgwxcpvvr-3000.app.github.dev/',
     headers :{
      "authorization" :"bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsImlhdCI6MTcyNDY3OTQ3NywiZXhwIjoxNzI0NjgzMDc3fQ.iksftWWhmmtc7968AsLAgtLOMCXeaoTU3T6H-u1Be78"
     }
    }),
  ],
});

async function main(){
   let res = await trpc.todo.getTodo.query()
  // let res2 = await trpc.createTodo.mutate({
  //   title:"dance",
  //   description:"gotta dance",
  //   done:true,
  //   userId: 1
  // })

  
  let res3 = await trpc.user.signup.mutate({
    username : "me",
    password : "123"
  })
  console.log(res3)
}
main()