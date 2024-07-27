import { createBrowserRouter, Navigate } from 'react-router-dom';

import App from '@/App.jsx';
import ErrorPage from '@/ErrorPage.jsx';

const LoginView = () => import('@/features/Auth/LoginView');
const SignupView = () => import('@/features/Auth/SignupView');
const ThankYouView = () => import('@/features/Auth/ThankYouView');

const HomeView = () => import('@/features/Home/HomeView');

const BrandView = () => import('@/features/Product/BrandView');
const CategoryView = () => import('@/features/Product/CategoryView');
const ProductDetailView = () => import('@/features/Product/DetailView');

const routes = [
  {
    path: '',
    element: <Navigate to="/home" />
  },
  {
    path: 'home',
    lazy: HomeView
  },
  {
    path: 'login',
    lazy: LoginView
  },
  {
    path: 'signup',
    lazy: SignupView
  },
  {
    path: 'thank-you',
    lazy: ThankYouView
  },
  {
    path: 'brands/:brandId',
    lazy: BrandView
  },
  {
    path: 'categories/:categoryId',
    lazy: CategoryView
  },
  {
    path: 'products/:productId',
    lazy: ProductDetailView
  },
];

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: routes
  }
]);

export default router;
