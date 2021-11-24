import React from "react";

import { Layout, Menu } from 'antd';
const { Header } = Layout;

class Navbar extends React.Component {
    state = {selectedKey: '1'}

    render() {
        return (
            <Header className="header">
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" selectedKeys={this.selectedKey}>
                    <Menu.Item key="1"><a href="/todo/test">Nav</a></Menu.Item>
                    <Menu.Item onClick={ () => console.log('dfdf')} key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
            </Header>
        )
    }
}

export default Navbar