import React, {useState} from 'react'
import { showSuccess, showError } from '../common/Toast'
import Button from './Button'

export default function DemoFetch(){
  const [loading, setLoading] = useState(false)

  async function doFetch(){
    setLoading(true)
    try{
      const res = await fetch('/api/teams')
      const data = await res.json()
      // show backend message if provided
      if (data?.message) showSuccess(data.message)
      else showSuccess('Fetched teams successfully')
    }catch(err){
      showError(err.message || 'Network error')
    }finally{
      setLoading(false)
    }
  }

  return (
    <div style={{display:'flex',gap:8,alignItems:'center'}}>
      <Button onClick={doFetch}>{loading ? 'Loading...' : 'Fetch Teams (demo)'}</Button>
    </div>
  )
}
