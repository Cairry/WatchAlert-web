import React, { useEffect, useState } from 'react'
import {
    Layout,
    theme,
    Avatar, Button,
    Popover,
    Spin,
    Menu,
    Typography,
    Dropdown,
    Space
} from 'antd'
import { DownOutlined, LeftOutlined,SunFilled,MoonFilled } from '@ant-design/icons';
import logoIcon from '../img/logo.jpeg'
import githubIcon from '../img/github_logo.png'
import { getUserInfo } from '../api/user'
import Auth from '../utils/Auth'
import { getTenantList } from '../api/tenant'
import './index.css';
import { ComponentSider } from './sider'
import { useNavigate } from 'react-router-dom'

export const ComponentsContent = (props) => {
    const { name, c } = props
    const navigate = useNavigate()
    const { Header, Content, Footer } = Layout
    const [userInfo, setUserInfo] = useState(null)
    const [loading, setLoading] = useState(false)
    const [tenantList, setTenantList] = useState([])
    const [getTenantStatus, setTenantStatus] = useState(null)
    const [darkMode, setDarkMode] = useState(false)

    Auth()

    const handleLogout = () => {
        localStorage.clear()
        navigate('/login')
    }

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken()

    const content = (
        <div>
            <Button type="text" onClick={handleLogout}>
                退出登录
            </Button>
        </div>
    )

    const run = async () => {
        try {
            const res = await getUserInfo()
            setUserInfo(res.data)
            setLoading(false)
        } catch (error) {
            console.error(error)
        }
    }

    const getTenantName = () => {
        return localStorage.getItem('TenantName')
    }

    const getTenantIndex = () => {
        return localStorage.getItem('TenantIndex')
    }

    const fetchTenantList = async () => {
        try {
            const res = await getTenantList()
            const opts = res.data.map((key, index) => (
                {
                    'label': key.name,
                    'value': key.id,
                    'index': index
                }
            ))
            setTenantList(opts)
            if (getTenantName() === null) {
                localStorage.setItem('TenantName', opts[0].label)
                localStorage.setItem('TenantID', opts[0].value)
                localStorage.setItem('TenantIndex', opts[0].index)
            }
            setTenantStatus(true)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchTenantList()
        run()
    }, [])

    useEffect(() => {
        const isDark = localStorage.getItem('darkMode') === 'true'
        setDarkMode(isDark)
    }, [])

    useEffect(() => {
        localStorage.setItem('darkMode', darkMode)
        if (darkMode) {
            document.body.classList.add('dark-mode')
        } else {
            document.body.classList.remove('dark-mode')
        }
    }, [darkMode])

    if (loading || !getTenantStatus) {
        return (
            <Spin tip="Loading...">
                <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
            </Spin>
        )
    }

    const goBackPage = () => {
        window.history.back()
    }

    const changeTenant = (c) => {
        localStorage.setItem("TenantIndex", c.key)
        if (c.item.props.name) {
            localStorage.setItem("TenantName", c.item.props.name)
        }
        if (c.item.props.value) {
            localStorage.setItem('TenantID', c.item.props.value)
        }
        window.location.reload()
    }

    const items = tenantList

    const menu = (
        <Menu selectable defaultSelectedKeys={getTenantIndex()} onSelect={changeTenant}>
            {items.map((item) => (
                <Menu.Item key={item.index} name={item.label} value={item.value}>
                    {item.label}
                </Menu.Item>
            ))}
        </Menu>
    )

    const getContainerStyle = (darkMode) => {
        const commonStyle = {
            height: '60px',
            margin: '16px 16px 0',
            borderRadius: borderRadiusLG,
            display: 'flex',
            alignItems: 'center',
        };

        if (darkMode) {
            return {
                ...commonStyle,
                background: 'rgb(97,84,84)', // 黑色背景
                color: '#000000', // 黑色文字
            };
        } else {
            return {
                ...commonStyle,
                background: '#ffffff', // 白色背景
                color: '#000000', // 黑色文字
            };
        }
    };

    const getContentStyle = (darkMode) => {
        const commonStyle = {
            height: 'calc(100vh - 80px - 65px)',
            margin: '0px 16px 0',
            borderRadius: '10px'
        };

        if (darkMode) {
            return {
                ...commonStyle,
                background: 'rgb(97,84,84)', // 黑色背景
                color: '#000000', // 黑色文字
            };
        } else {
            return {
                ...commonStyle,
                background: '#ffffff', // 白色背景
                color: '#000000', // 黑色文字
            };
        }
    };

    const getLeftOutlined = (darkMode) => {
        if (darkMode) {
            return {
                color: '#b1b1b1', // 白色文字
            };
        } else {
            return {
                color: '#000000', // 黑色文字
            };
        }
    };

    const clonedComponent = React.cloneElement(c, { darkMode: darkMode });

    return (
        <>
            <Layout className={darkMode ? 'dark-mode' : ''} style={{ height: '100vh', overflow: 'hidden', }} >
                {/* 导航栏 */}
                <div style={{
                    marginLeft: '15px',
                    marginTop: '89px',
                }}>
                    {<ComponentSider className={darkMode ? 'dark-mode' : ''} userInfo={userInfo} darkMode={darkMode} />}
                </div>

                {/* 内容区 */}
                <Layout className={darkMode ? 'dark-mode' : ''} >
                    {/* 右侧顶部 */}
                    <Layout className={darkMode ? 'dark-mode' : 'light-mode'} style={{ marginLeft: '-216px', padding: 0, borderRadius: '12px', }}>
                        <Header
                            className={darkMode ? 'dark-mode-header' : 'light-mode'}
                            style={getContainerStyle(darkMode)}
                            >

                            <div style={{ marginTop: '25px', marginLeft: '-30px' }}>
                                <div className="footer">
                                    <a target="_blank" title="Logo">
                                        <img src={logoIcon} alt="Logo" className="icon" style={{ width: '40%', height: '40%' }} />
                                    </a>
                                </div>
                            </div>

                            <div style={{ fontSize: 15, fontWeight: 'bold' }}>
                                <div style={{ position: 'absolute', left: '100px', top: '12px' }}>
                                    <Dropdown overlay={menu} trigger={['click']}>
                                        <Typography.Link className="multi-tenant">
                                            <Space >
                                                多租户
                                                <DownOutlined />
                                            </Space>
                                        </Typography.Link>
                                    </Dropdown>
                                </div>
                            </div>

                            <div style={{ display: 'flex',position: 'absolute', top: '25px', right: '30px', bottom: '10px' }}>
                                <div style={{marginTop:'-5px'}}>
                                    <Button type="text" onClick={() => setDarkMode(!darkMode)}>
                                        {darkMode ? <SunFilled style={{fontSize: 25,color: '#ffffff'}}/> : <MoonFilled style={{fontSize: 25,color: '#000000'}}/>}
                                    </Button>
                                </div>
                                {userInfo !== null ? (
                                    <Popover content={content} trigger="hover" placement="bottom">
                                        <Avatar
                                            style={{
                                                backgroundColor: '#7265e6',
                                                verticalAlign: 'middle',
                                            }}
                                            size="large"
                                        >
                                            {userInfo.username}
                                        </Avatar>
                                    </Popover>
                                ) : null}
                            </div>
                        </Header>
                    </Layout>

                    {/* 右侧内容区 */}
                    <Layout className={darkMode ? 'dark-mode' : 'light-mode'} style={{ marginTop: '15px' }}>
                        <Content
                            className={darkMode ? 'dark-mode' : 'light-mode'}
                            style={getContentStyle(darkMode)}
                        >
                            <div style={{ fontSize: 15, fontWeight: 'bold', marginLeft: '1%', justifyContent: 'center', marginTop: '20px' }}>
                                <Button type="text" shape="circle" icon={<LeftOutlined style={getLeftOutlined(darkMode)}/>} onClick={goBackPage} />
                                {name}
                            </div>
                            <div
                                className="site-layout-background"
                                style={{ padding: 24, textAlign: 'center', height: '10px' }}
                            >
                                {clonedComponent}
                            </div>
                        </Content>
                    </Layout>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1vh' }}>
                        <a href="https://github.com/Cairry/WatchAlert" target="_blank" title="GitHub" rel="noreferrer">
                            <img src={githubIcon} alt="GitHub Icon" className="icon" style={{ width: '2vh', height: '2vh', marginRight: '5px' }} />
                        </a>
                    </div>
                    <Footer style={{ textAlign: 'center', padding: '1vh' }}>WatchAlert ©2024 Created by Cairry</Footer>

                </Layout>
            </Layout >
        </>
    )
}