import React from 'react'
import { Link, useLocation, useNavigate, } from 'react-router'
import Logo from '../assets/react.svg';
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage, } from "@/components/ui/avatar"
import { LinkIcon, LogOut } from 'lucide-react';
import { UrlState } from '../context';
import useFetch from '../hooks/use-fetch';
import { logout } from '../db/apiAuth';
import { BarLoader } from 'react-spinners';

const Header = () => {
    const {loading, fn: fnLogout} = useFetch(logout);
    const navigate = useNavigate();
    const {user, fetchUser} = UrlState();
    const location = useLocation();

    return (
        <>
            <nav className='flex px-5 justify-between items-center '>
                <Link to={'/'}>
                    <img src={Logo} className='h-16 py-4' alt='Temp Logo' />
                </Link>

                {!user ?
                    location.pathname !== '/auth' && <Button onClick={() => navigate('/auth')} className="bg-white border-2 border-gray-700 text-black hover:text-white hover:bg-blue-500" >Login</Button>
                    :
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar>
                                <AvatarImage src={user?.user_metadata?.profile_pic} alt="shadcn Image" className="object-contain" />
                                <AvatarFallback>UN</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="mr-10">
                            <DropdownMenuLabel className="select-none">{user?.user_metadata?.name}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer">
                                <Link to={"/dashboard"} className='flex '>
                                    <LinkIcon className='mr-2 h-4 w-4' />
                                    My Links
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem  >
                                <button
                                    onClick={() => {
                                        fnLogout().then(() => {
                                            fetchUser();
                                            navigate("/auth");
                                        });
                                    }}
                                    className="cursor-pointer text-red-800 flex flex-row w-full items-center">
                                    <LogOut className='mr-2 h-4 w-4' />
                                    Logout
                                </button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>}
            </nav>
            {loading && <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />}
        </>
    )
}

export default Header