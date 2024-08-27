import { useState } from "react"


export default function Signup() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    return (
        <>
            <div>
                <div>
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
                {username}
                {password}
            </div></>
    )
}