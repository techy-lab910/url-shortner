import React, { useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useNavigate, useSearchParams } from 'react-router';
import Login from '../components/Login';
import Register from '../components/Register';
import { UrlState } from '../context';

const Auth = () => {
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get('createNew');
  const navigate = useNavigate();
  const { isAuthenticated, loading } = UrlState();

  useEffect(() => {
    if (isAuthenticated && !loading)
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
  }, [isAuthenticated, loading, navigate]);

  return (
    <div className="mt-16 flex flex-col items-center gap-10">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center">
        {longLink ? "Hold up! Let's login first.." : "Login / Signup"}
      </h1>
      <Tabs defaultValue="login" className="w-full max-w-[400px] sm:max-w-[500px] lg:max-w-[600px]">
        <TabsList className="grid w-full grid-cols-2 h-12 bg-gray-800 data-[state=active]:bg-gray-500 !text-white data-[state=active]:text-[#d1dad8] sm:grid-cols-2 md:grid-cols-2">
          <TabsTrigger value="login" className="p-2 data-[state=active]:bg-gray-500 data-[state=active]:text-[#d1dad8] text-white">
            Login
          </TabsTrigger>
          <TabsTrigger value="signup" className="p-2 data-[state=active]:bg-gray-500 data-[state=active]:text-[#d1dad8] text-white">
            Signup
          </TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <Login />
        </TabsContent>
        <TabsContent value="signup">
          <Register />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Auth;
