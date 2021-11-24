import Navbar from './navbar'
import Footer from './footer'
import { Layout } from 'antd';

const { Content } = Layout;

export default function layout({ children }) {
  return (
    <>
    <Layout>
        <Navbar />
            <Content style={{ padding: '0 50px' }}>
                <main>{children}</main>
            </Content>
        <Footer />
    </Layout>
    </>
  )
}