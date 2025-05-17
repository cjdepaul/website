import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from "@/components/ui/button"
import axios from 'axios';
import {QueryClient, useQuery} from '@tanstack/react-query'

function App() {
  const [count, setCount] = useState(0)

  const fetchStatus = async () => {
  const res = await axios.get('http://localhost:8000/api/status');
  return res.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['status'],
    queryFn: fetchStatus
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading planet data.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Api Call</h1>
      <p>{data.status}</p>
    </div>
  );
}


export default App
