import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

const Login = ({ login }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [errorMessage, setErrorMessage] = useState(false)
    const router = useRouter();

    useEffect(() => {
        const userItem = localStorage.getItem('items')
        if (userItem) {
            router.push('/profile')
        }
    }, []);

    const handleLogin = async data => {
        const response = await fetch(
            'https://api-nodejs-todolist.herokuapp.com/user/login', {
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }
        )

        const result = await response.json()

        if (response.ok) {
            localStorage.setItem('items', JSON.stringify(result))
            router.push('/profile')
        } else {
            setErrorMessage(result)
        }
    };

    return (
        <>
            <div class="container">
                <form onSubmit={handleSubmit(handleLogin)} className="form">
                    <div className="input-container">
                        <label htmlFor="email">Email</label>
                        <input
                            placeholder="Email"
                            type="text"
                            {...register("email", {
                                required: "This is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                    message: "Invalid email address"
                                }
                            })}
                        />

                    <div className="error">{errors.email && <p role="alert">{errors.email.message}</p>}</div>
                    </div>

                    <div className="input-container">
                        <label htmlFor="password">password</label>
                        <input
                            placeholder="Password"
                            type="password"
                            {...register("password", {
                                required: "This is required",
                                minLength: {
                                    value: 7,
                                    message: 'Min length is 7'
                                }
                            })}
                        />

                        <div className="error">{errors.password && <p role="alert">{errors.password.message}</p>}</div>
                    </div>
                    <div className="error mb-10">{errorMessage ? errorMessage : ''}</div>
                    <button type="submit" className='btn'>Login</button>
                </form>
            </div>
        </>
    );
}

export default Login
