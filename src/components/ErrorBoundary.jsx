import React from "react";
import toast from 'react-hot-toast';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    try { toast.error('Something went wrong'); } catch {}
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24, textAlign: "center" }}>
          <h2>Something went wrong.</h2>
          <p>Try refreshing the page or navigating elsewhere.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

