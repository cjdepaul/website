import { useState } from 'react'
import './App.css'
import { Button } from "@/components/ui/button"
import axios from 'axios';
import {useQuery} from '@tanstack/react-query'

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
      <Button onClick={() => setCount(count + 1)} className="bg-amber-600">count is {count}</Button>
      <div className="p-8 bg-red-500 text-white">
        If this is red, Tailwind works.
      </div>
    </div>
  );
}


export default App
