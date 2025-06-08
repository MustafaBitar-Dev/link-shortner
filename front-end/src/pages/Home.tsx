import UrlShortener from '../components/UrlShortener';
function Home() {
  return (
    <div className="App">
      <h1 style={{margin: '50px 0' }}>
        Welcome to the URL Shortener 
      </h1>
      <UrlShortener />
    </div>
  );
}

export default Home;