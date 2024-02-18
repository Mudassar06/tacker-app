'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supaClient } from '@/lib/supabase/supabase_client'

export default function Page() {
  const { trackerID } = useParams();
  
  const [inputs, setInputs] = useState({
    id: 0,
    data: ""
  })

  const handleInputChange = (e, field) => {
    setInputs(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  
  const runSupa = async () => {
    const supabase = supaClient();
    const { data, error } = await supabase
      .from('trial')
      .insert([
        { id: inputs.id, data: inputs.data },
      ])
      .select();
            
    console.log(data, "Some trial");
    console.log(error, "ERROR");  
  }

  useEffect(() => {
    // runSupa()
  }, []);

  return (
    <div>
      <div>Daily Tracker: {trackerID}</div>

      <input 
        placeholder='Add ID' 
        value={inputs.id} 
        className='text-black'
        onChange={(e) => handleInputChange(e, 'id')}
      />

      <br/><br/>
      
      <input 
        placeholder='Add Data' 
        value={inputs.data} 
        className='text-black'
        onChange={(e) => handleInputChange(e, 'data')}
      />
      <br/><br/>
      <button onClick={runSupa}>Submit</button>
    
    </div>
  )
}
