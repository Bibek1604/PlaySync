import React from 'react'

export default function Card({children, style={}, className=''}){
  return (
    <div className={className} style={{padding:16,borderRadius:10,background:'#071026',border:'1px solid rgba(255,255,255,0.03)',...style}}>
      {children}
    </div>
  )
}
