export default function Head() {
    return (
      <>
        <title>HOA Advocate</title>
        <meta name="description" content="Platforma za Homeowner Association komunikaciju i upravljanje" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Foundation CSS CDN */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/foundation-sites@6.7.5/dist/css/foundation.min.css"
          integrity="sha384-UYh7QGj5mIYUcJ5N1Zm7vTHTNDQ63rUceKQgz99Ju+axRE9D2tdFFg8e0LXYdQAr"
          crossOrigin="anonymous"
        />
  
        {/* Lucide Icons fallback (ako koristiš putem <script>) */}
        <script
          defer
          src="https://unpkg.com/lucide@latest"
        />
      </>
    );
  }