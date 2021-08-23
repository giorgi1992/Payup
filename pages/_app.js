import Navbar from '../components/Navbar'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import '../styles/global.scss'

const App = ({ Component, pageProps }) => {
    const [auth, setAuth] = useState(false)
    const router = useRouter()

    useEffect(() => {
        authCheck(router.asPath);
        router.events.on('routeChangeComplete', authCheck)
    }, []);

    const authCheck = (url) => {
        const publicPaths = ['/', '/login', '/register']
        const path = url.split('?')[0]
        const userItem = localStorage.getItem('items')

        if (!userItem && !publicPaths.includes(path)) {
            setAuth(false)
            router.push('/login')
        } else {
            setAuth(true)
        }
    }

    return (
        <>
            {auth &&
                <>
                    <Navbar />
                    <Component {...pageProps} />
                </>
            }
        </>
    )
}

export default App
