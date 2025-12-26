import './locales/i18n'
import i18n from './locales/i18n'
import { I18nextProvider } from 'react-i18next'
import { HashRouter, useRoutes } from 'react-router-dom'
import { Layout } from './components/layout'
import { routes } from './route'

function AppRoutes(): React.JSX.Element | null {
  return useRoutes(routes)
}

function App(): React.JSX.Element {
  return (
    <I18nextProvider i18n={i18n}>
      <HashRouter>
        <Layout>
          <AppRoutes />
        </Layout>
      </HashRouter>
    </I18nextProvider>
  )
}

export default App
