import { ProLayout } from '@ant-design/pro-components';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { CrownOutlined, FundOutlined, ShoppingOutlined, StarOutlined, FileTextOutlined } from '@ant-design/icons';

const menuRoutes = {
  routes: [
    { path: '/dashboard', name: '行情看板', icon: <FundOutlined /> },
    { path: '/portfolio', name: '投资组合', icon: <CrownOutlined /> },
    { path: '/trading', name: '交易', icon: <ShoppingOutlined /> },
    { path: '/watchlist', name: '自选', icon: <StarOutlined /> },
    { path: '/doc-editor', name: '文档编辑', icon: <FileTextOutlined /> },
  ],
};

export default function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <ProLayout
      title="智投金融"
      logo={null}
      layout="mix"
      fixedHeader
      fixSiderbar
      route={menuRoutes}
      location={{ pathname: location.pathname }}
      menuItemRender={(item, dom) => (
        <div onClick={() => item.path && navigate(item.path)}>{dom}</div>
      )}
      avatarProps={{
        title: '投资者',
        size: 'small',
      }}
    >
      <Outlet />
    </ProLayout>
  );
}
