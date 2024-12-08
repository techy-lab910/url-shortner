import { Link, Outlet } from 'react-router'
import Header from '../components/Header'

const appLayout = () => {
    return (
        <div>
            <main className='min-h-screen container mx-auto px-3 !text-white pb-10'>
                <Header />
                <Outlet />
            </main>
            <div className="p-10 text-center bg-gray-900 pt-10 text-white border-t-2">
                <Link to={"https://github.com/910aman"}>
                    &quot;Made with 💗, from one developer to another.&quot;
                </Link>
            </div>
        </div>
    )
}

export default appLayout
