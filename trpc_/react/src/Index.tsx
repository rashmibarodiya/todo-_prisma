

// import Signup from "./Signup"
import Signin from "./Signin";
import { trpc } from "./utils/trpc"
export default function Index() {
    const userQuery = trpc.user.me.useQuery();
    const todoMutate = trpc.todo.createTodo.useMutation();
    const todoQuery = trpc.todo.getAllTodo.useQuery();

    if (userQuery.isLoading) {
        return <div>Loading...</div>;
    }

    if (userQuery.isError) {
        alert(userQuery.error)
        console.log("myerror : ")
        console.error(userQuery.error)
        return <Signin></Signin>;
    }
console.log("user query ")
console.log(userQuery.data)
    return (
        <div>
            gkfdjghkfdjgh
            <p>Hi {userQuery.data?.username}</p>
            {todoQuery.data?.map((x, index) => (
                <div key={index}>{x.title} - {x.description}</div>
            ))}
            <button
                disabled={todoMutate.isPending}
                onClick={() => todoMutate.mutate({
                    title: 'title',
                    description: "go to gym",
                    done: false,  
                    userId: userQuery.data?.id  
                })}
            >
                Create Todo
            </button>
        </div>
    );
}
