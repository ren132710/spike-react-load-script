import Search from './Search';
import { useExternalScript } from './useExternalScript';
import './App.css';

export default function App() {
  const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

  // https://developers.google.com/maps/documentation/javascript/url-params#required_parameters
  const url = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`;
  const state = useExternalScript(url);

  return (
    <div className="search-container">
      {state === 'loading' && <p>Loading...</p>}
      {state === 'ready' && <Search />}
    </div>
  );
}
