import React from 'react';

class ErrorBoundary extends React.Component {
  state = {
    hasError: false
  };

  static getDerivedStateError(error){
    return { hasError : true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
        return this.props.fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;