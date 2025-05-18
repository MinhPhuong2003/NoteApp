import React, { createContext, useState, useEffect } from 'react';
import { getDoc, doc, setDoc } from 'firebase/firestore';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      setLoading(false);
    };
    checkUser();
  }, []);
  
  const register = async (email, password, fullName, phone, address) => {
    const id = email;
    const userData = {
      email,
      password,
      fullName,
      phone,
      address,
      role: 'customer'
    };
    await setDoc(doc(db, 'USERS', id), userData, { merge: true });
    setUser(userData);
  };

  const login = async (email, password) => {
    const snapshot = await getDoc(doc(db, 'USERS', email));
    if (snapshot.exists()) {
      const data = snapshot.data();
      if (data.password === password) {
        setUser(data);
      } else {
        throw new Error('Wrong password');
      }
    } else {
      throw new Error('User not found');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login }}>
      {children}
    </AuthContext.Provider>
  );
};