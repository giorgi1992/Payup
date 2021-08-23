import Link from 'next/link'
import { useRouter } from 'next/router'


const Navbar = () => {
    const userItem = localStorage.getItem('items')
    const router = useRouter()

    return (
        <>
            <nav className="nav">
                <li>
                    <Link href="/">Home</Link>
                </li>
                {!userItem ?
                    <>
                        <li>
                            <Link href="/login">Login</Link>
                        </li>
                        <li>
                            <Link href="/register">Register</Link>
                        </li>
                    </>
                    :
                    <>
                        <li>
                            <Link href="/profile">Profile</Link>
                        </li>
                        <li>
                            <button className="btn" onClick={() => {
                                localStorage.removeItem('items')
                                router.push('/')
                            }}>Logout</button>
                        </li>
                    </>
                }
            </nav>
        </>
    )
}

export default Navbar
