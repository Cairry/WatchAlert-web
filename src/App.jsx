import React from 'react';
import { ConfigProvider, theme } from 'antd';
import { Helmet } from 'react-helmet';
import routes from './routes';
import { useRoutes } from 'react-router-dom';
import './index.css'
import { ContextProvider } from './context/RuleContext';

export default function App() {
    const element = useRoutes(routes);
    const title = "WatchAlert";

    return (
        <ContextProvider>
            <ConfigProvider  theme={{ algorithm: theme.defaultAlgorithm }}>
                <Helmet>
                    <title>{title}</title>
                </Helmet>
                {element}
            </ConfigProvider>
        </ContextProvider>
    );
}