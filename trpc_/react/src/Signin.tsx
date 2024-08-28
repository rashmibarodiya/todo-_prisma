import { useState } from "react";
import { trpc } from './utils/trpc';

export default function Signin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const userSigninMutate = trpc.user.login.useMutation({
        onSuccess: (data) => {
            // Check if the response contains a token
            if ('token' in data) {
                let token = data.token;
                localStorage.setItem("token", token);
             window.location.href = "/";//  window.location.reload();
                alert("Login successful");
            } else {
                alert(data.msg);  // Show error message
            }
        }
    });

    return (
        <>
            <div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    Username:
                    <input
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    Password:
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button onClick={() => userSigninMutate.mutate({ username, password })}>
                    Log In
                </button>
            </div>
        </>
    );
}
