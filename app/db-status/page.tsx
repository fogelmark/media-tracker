'use client';

import { useState, useEffect } from 'react';

export default function DBStatus() {
  const [status, setStatus] = useState<string>('Loading...');
  const [color, setColor] = useState<string>('text-gray-500');

  useEffect(() => {
    const checkDatabaseStatus = async () => {
      try {
        const response = await fetch('/api/db-status');
        const data: { status: string; message: string } = await response.json();

        if (data.status === 'success') {
          setStatus('Database is connected ✅');
          setColor('text-green-500');
        } else {
          setStatus('Database connection failed ❌');
          setColor('text-red-500');
        }
      } catch (error) {
        setStatus('Failed to fetch status ❌');
        setColor('text-red-500');
      }
    };

    checkDatabaseStatus();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Database Status</h1>
      <p className={`text-xl ${color}`}>{status}</p>
    </div>
  );
}