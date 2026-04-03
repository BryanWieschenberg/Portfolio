import ReactDOM from 'react-dom/client';

const hostname = window.location.hostname;
const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

async function renderApp() {
    if (hostname.startsWith('tools.')) {
        await import('./tools/globals.css');
        const { default: ToolsApp } = await import('./tools/App');
        root.render(<ToolsApp />);
    } else {
        await import('./portfolio/globals.css');
        const { default: PortfolioApp } = await import('./portfolio/App');
        root.render(<PortfolioApp />);
    }
}

renderApp();
