import { useState } from "react"
import { trpc } from './utils/trpc';

export default function Signup() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const userSignupMutate = trpc.user.signup.useMutation({
        onSuccess: (data) => {
           
            let token = data.token;
            localStorage.setItem("token", token);
            window.location.href = "/";
            alert("signup successfully")
          }
        });
    return (
        <>
            <div>
                <div style={
                    {display :"flex",justifyContent : "center"}
                }>
                    username:

                    <input onChange={(e) => {
                        setUsername(e.target.value)
                    }}
                    ></input>

                </div>
                <div>
                    password :

                    <input onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                    ></input>

                </div>
                <button onClick={async () => {
      userSignupMutate.mutate({
        username,
        password
      })
    }}>Sign up</button>
                
            </div></>
    )
}