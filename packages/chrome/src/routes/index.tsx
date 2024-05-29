import { lazy } from 'react';
import { Navigate, Outlet, RouteObject } from 'react-router-dom';
import RequireInit from '../components/RequireInit';
import { withSus } from '../components/TheSuspense';
import Session from '../components/Session';

const MainPage = lazy(async () => await import('../pages/MainPage'));
const CoinDetailPage = lazy(
  async () => await import('../pages/CoinDetailPage')
);
const NFTPage = lazy(async () => await import('../pages/NFTPage'));
const NFTDetailPage = lazy(
  async () => await import('../pages/NFTPage/NftDetail')
);
const NFTSendPage = lazy(async () => await import('../pages/NFTPage/NftSend'));
const WelcomePage = lazy(
  async () => await import('../pages/onboarding/WelcomePage')
);
const WormholePage = lazy(async () => import('../pages/WormholePage'));
const SettingPage = lazy(async () => await import('../pages/SettingsPage'));
const SettingWalletPage = lazy(
  async () => await import('../pages/SettingsPage/wallet')
);
const SettingNetworkPage = lazy(
  async () => await import('../pages/SettingsPage/network')
);
const SettingSecurityPage = lazy(
  async () => await import('../pages/SettingsPage/security')
);
const SendPage = lazy(async () => await import('../pages/WormholePage'));
const StakingPage = lazy(async () => await import('../pages/StakingPage'));
const TxHistoryPage = lazy(
  async () => await import('../pages/txn/TxHistoryPage')
);
const TxDetailPage = lazy(
  async () => await import('../pages/txn/TxDetailPage')
);
const CreateNewWalletPage = lazy(
  async () => await import('../pages/onboarding/CreateNewWalletPage')
);
const ImportWalletPage = lazy(
  async () => await import('../pages/onboarding/ImportWalletPage')
);
const DappConnectPage = lazy(
  async () => await import('../pages/dapp/ConnectPage')
);
const DappTxApprovePage = lazy(
  async () => await import('../pages/dapp/TxApprovePage')
);
const DappSignMsgPage = lazy(
  async () => await import('../pages/dapp/SignMsgPage')
);
const SwapPage = lazy(async () => await import('../pages/SwapPage'));

const DappsPage = lazy(async () => await import('../pages/DappsPage'));
const PasswordConfirmPage = lazy(
  async () => await import('../pages/PasswordConfirmPage')
);
const TestPage = lazy(async () => await import('../pages/TestPage'));

const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: (
      <RequireInit>
        <Session>
          <Outlet />
        </Session>
      </RequireInit>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="home" />,
        // element: <Navigate to="test" />,
      },
      {
        path: 'test',
        element: withSus(<TestPage />),
      },
      {
        path: 'home',
        element: withSus(<MainPage />),
      },
      {
        path: 'nft',
        children: [
          {
            index: true,
            element: withSus(<NFTPage />),
          },
          {
            path: 'details',
            element: withSus(<NFTDetailPage />),
          },
          {
            path: 'send',
            element: withSus(<NFTSendPage />),
          },
        ],
      },
      {
        path: 'coin/detail/:coinType',
        element: withSus(<CoinDetailPage />),
      },
      {
        path: 'wormhole',
        element: withSus(<WormholePage />),
      },
      {
        path: 'dapps',
        children: [
          {
            index: true,
            element: withSus(<DappsPage />),
          },
        ],
      },
      {
        path: 'send',
        children: [
          {
            index: true,
            element: withSus(<SendPage />),
          },
        ],
      },
      {
        path: 'swap',
        element: withSus(<SwapPage />),
      },
      {
        path: 'staking',
        element: withSus(<StakingPage />),
      },
      {
        path: 'transaction/flow',
        element: withSus(<TxHistoryPage />),
      },
      {
        path: 'transaction/detail/:digest',
        element: withSus(<TxDetailPage />),
      },
      {
        path: 'settings',
        children: [
          {
            index: true,
            element: withSus(<SettingPage />),
          },
          {
            path: 'wallet',
            element: withSus(<SettingWalletPage />),
          },
          {
            path: 'network',
            element: withSus(<SettingNetworkPage />),
          },
          {
            path: 'security/*',
            element: withSus(<SettingSecurityPage />),
          },
        ],
      },
      { path: 'password-confirm', element: withSus(<PasswordConfirmPage />) },
    ],
  },
  {
    path: 'onboard',
    children: [
      {
        index: true,
        element: <Navigate to="/onboard/welcome" />,
      },
      {
        path: 'welcome',
        element: withSus(<WelcomePage />),
      },
      {
        path: 'create-new-wallet',
        element: withSus(<CreateNewWalletPage />),
      },
      {
        path: 'import-wallet',
        element: withSus(<ImportWalletPage />),
      },
    ],
  },
  {
    path: 'wallet/*',
    element: (
      <Session>
        <Outlet />
      </Session>
    ),
    children: [
      // reuse page component but with session project
      {
        path: 'create',
        element: withSus(<CreateNewWalletPage />),
      },
      {
        path: 'import',
        element: withSus(<ImportWalletPage />),
      },
    ],
  },
  {
    path: 'dapp',
    element: (
      <RequireInit>
        <Session>
          <Outlet />
        </Session>
      </RequireInit>
    ),
    children: [
      {
        path: 'connect',
        element: withSus(<DappConnectPage />),
      },
      {
        path: 'tx-approval',
        element: withSus(<DappTxApprovePage />),
      },
      {
        path: 'sign-msg',
        element: withSus(<DappSignMsgPage />),
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/home" />,
  },
];

export default routesConfig;
