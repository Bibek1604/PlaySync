import React from 'react'
import { toast } from 'react-toastify'

class ErrorBoundary extends React.Component {
  constructor(props){
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(){
    return { hasError: true }
  }

  componentDidCatch(error, info){
    // show a user friendly toast
    toast.error('Unexpected error occurred — try refreshing the page.')
    // optional: log to console or external service
    // console.error(error, info)
  }

  render(){
    if (this.state.hasError){
      return (
        <div style={{padding:24}}>
          <h2>Something went wrong.</h2>
          <p>Please refresh the page or contact support.</p>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
