import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LoginSection from '../components/loginInscription/LoginSection';
import SignupSection from '../components/loginInscription/SignupSection';

export const LoginInscriptionPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main className="pt-28 mx-auto py-16 min-h-[820px] flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {isLogin ? (
            <LoginSection setIsLogin={setIsLogin} />
          ) : (
            <SignupSection setIsLogin={setIsLogin} />
          )}
        </motion.div>
      </div>
    </main>
  );
};

export default LoginInscriptionPage;
