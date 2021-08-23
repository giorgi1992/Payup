import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'

const Register = () => {
    const { register, setError, formState: { errors }, handleSubmit } = useForm()
    const router = useRouter()

    useEffect(() => {
        const userItem = localStorage.getItem('items')
        if (userItem) {
            router.push('/profile')
        }
    }, []);

    const handleRegister = async (data) => {
        const response = await fetch(
            'https://api-nodejs-todolist.herokuapp.com/user/register', {
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }
        )

        const result = await response.json()

        const errorInfo = [
            { name: 'email', message: 'Email is already taken' },
            { name: 'password', message: 'Password cannot contain "password"' },
        ]

        if (response.ok) {
            router.push('/login')
        } else {
            errorInfo.map(item => {
                if (result.includes(item.name)) {
                    setError(item.name, {
                        message: item.message,
                    });
                }
            })
        }
    };

    return (
        <>
            <div class="container">
                <form onSubmit={handleSubmit(handleRegister)} className="form">
                    <div className="input-container">
                        <label htmlFor="name">Name</label>
                        <input
                            placeholder="Name"
                            type="text"
                            {...register("name", {
                                required: "This is a required",
                            })}
                        />

                        <div className="error">{errors.name && <p>{errors.name.message}</p>}</div>
                    </div>

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

                        <div className="error">{errors.email && <p>{errors.email.message}</p>}</div>
                    </div>

                    <div className="input-container">
                        <label htmlFor="password">Password</label>
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

                        <div className="error"> {errors.password && <p>{errors.password.message}</p>}</div>
                    </div>

                    <div className="input-container">
                        <label htmlFor="age">Age</label>
                        <input
                            placeholder="Age"
                            type="number"
                            {...register("age", {
                                required: "This is required"
                            })}
                        />

                        <div className="error">{errors.age && <p>{errors.age.message}</p>}</div>
                    </div>

                    <button className="btn">Register</button>
                </form>
            </div>
        </>
    );
}

export default Register
