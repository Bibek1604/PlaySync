import React from 'react'

export default function Button({children, onClick, className = '', size = 'md', ...rest}){
  const base = 'padding:8px 12px;border-radius:8px;border:none;cursor:pointer;font-weight:600'
  const sizes = {
    md: base + ';font-size:1rem',
    sm: base + ';font-size:0.88rem;padding:6px 10px'
  }
  return (
    <button onClick={onClick} className={className} style={{all:'unset',display:'inline-block'}} {...rest}>
      <div style={{background:'linear-gradient(90deg,#6ee7b7,#60a5fa)',color:'#021,',padding: sizes[size]}}>{children}</div>
    </button>
  )
}
