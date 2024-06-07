import { ConfigProvider, Button } from 'antd';
import { useState } from 'react';
import { TimePicker } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

function TestMode() {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <ConfigProvider theme={darkMode ? 'dark' : 'light'}>
            <div style={{ backgroundColor: darkMode ? '#333' : '#fff', color: darkMode ? '#fff' : '#333', minHeight: '100vh', padding: '20px' }}>
                <Button onClick={toggleDarkMode} style={{ marginBottom: '20px' }}>
                    {darkMode ? '切换为亮色模式' : '切换为暗黑模式'}
                    <SmileOutlined />
                </Button>
                <p style={{ color: darkMode ? '#fff' : '#333' }}>{darkMode ? '当前主题：暗黑模式' : '当前主题：亮色模式'}</p>
                <TimePicker.RangePicker
                    style={{ background: darkMode ? '#333' : '#fff', color: darkMode ? '#fff' : '#333' }}
                />
            </div>
        </ConfigProvider>
    );
}

export default TestMode;