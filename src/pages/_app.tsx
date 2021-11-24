import "../app/styles/globals.css"
import 'antd/dist/antd.css';

import PropTypes from "prop-types"
import { Provider } from "react-redux"
import Layout from "./Components/layout"

import { store } from "../app/redux/store"

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Provider>
    )
}

MyApp.propTypes = {
    Component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
    pageProps: PropTypes.shape({}),
}

export default MyApp
