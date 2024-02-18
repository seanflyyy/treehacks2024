// pages/_app.js
import { Provider } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';
import store from '@/redux/store';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

const wrapper = createWrapper(store);
export default wrapper.withRedux(MyApp);
