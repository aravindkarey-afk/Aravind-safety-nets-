import { RouteObject } from 'react-router';
import HomePage from './pages/index';
import ServicesPage from './pages/services/index';
import PigeonSafetyNetsPage from './pages/services/pigeon-safety-nets';
import ChildrenSafetyNetsPage from './pages/services/children-safety-nets';
import InvisibleGrillsPage from './pages/services/invisible-grills';
import BalconySafetyNetsPage from './pages/services/balcony-safety-nets';
import DuctAreaNetsPage from './pages/services/duct-area-nets';
import MonkeySafetyNetsPage from './pages/services/monkey-safety-nets';
import ClothHangersPage from './pages/services/cloth-hangers';
import GalleryPage from './pages/gallery';
import ContactPage from './pages/contact';
import AboutPage from './pages/about';
import ThankYouPage from './pages/thank-you';
// Eager import so renderToString doesn't hit a Suspense boundary on 404 routes
// and abort to client rendering. The prod 404 page is tiny; the dev-tools
// variant stays lazy because it pulls in dev-only code we don't want in
// production bundles.
import ProdNotFoundPage from './pages/_404';

const NotFoundPage = ProdNotFoundPage;

export const routes: RouteObject[] = [
  { path: '/', element: <HomePage /> },
  { path: '/services', element: <ServicesPage /> },
  { path: '/services/pigeon-safety-nets', element: <PigeonSafetyNetsPage /> },
  { path: '/services/children-safety-nets', element: <ChildrenSafetyNetsPage /> },
  { path: '/services/invisible-grills', element: <InvisibleGrillsPage /> },
  { path: '/services/balcony-safety-nets', element: <BalconySafetyNetsPage /> },
  { path: '/services/duct-area-nets', element: <DuctAreaNetsPage /> },
  { path: '/services/monkey-safety-nets', element: <MonkeySafetyNetsPage /> },
  { path: '/services/cloth-hangers', element: <ClothHangersPage /> },
  { path: '/gallery', element: <GalleryPage /> },
  { path: '/about', element: <AboutPage /> },
  { path: '/contact', element: <ContactPage /> },
  { path: '/thank-you', element: <ThankYouPage /> },
  { path: '*', element: <NotFoundPage /> },
];

// Types for type-safe navigation
export type Path =
  | '/'
  | '/services'
  | '/services/pigeon-safety-nets'
  | '/services/children-safety-nets'
  | '/services/invisible-grills'
  | '/services/balcony-safety-nets'
  | '/services/duct-area-nets'
  | '/services/monkey-safety-nets'
  | '/services/cloth-hangers'
  | '/gallery'
  | '/about'
  | '/contact'
  | '/thank-you';

export type Params = Record<string, string | undefined>;
