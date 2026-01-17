import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-[#1a1a1a] text-[#f5f5f5] p-10 pt-32 font-serif selection:bg-[#d4af37] selection:text-[#1a1a1a]">
                    <h1 className="text-4xl text-[#d4af37] mb-6 tracking-widest uppercase">Something went wrong</h1>
                    <div className="border border-white/10 p-6 bg-white/5 backdrop-blur-sm rounded-sm mb-8">
                        <details className="whitespace-pre-wrap font-mono text-sm text-gray-400">
                            <summary className="cursor-pointer hover:text-white transition-colors mb-4">View Error Details</summary>
                            {this.state.error && this.state.error.toString()}
                            <br />
                            {this.state.errorInfo && this.state.errorInfo.componentStack}
                        </details>
                    </div>
                    <button
                        onClick={() => {
                            localStorage.removeItem('cart'); // Clear cart as fallback fix
                            window.location.href = '/';
                        }}
                        className="px-8 py-3 bg-[#d4af37] text-[#1a1a1a] uppercase tracking-widest text-sm hover:bg-white transition-all duration-300"
                    >
                        Return Home & Clear Cart
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
