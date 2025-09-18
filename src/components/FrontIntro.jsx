// src/components/FrontIntro.jsx
export default function FrontIntro() {
    return (
      <section className="bg-white py-24 flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl font-bold mb-4">BlockVault</h1>
        <p className="text-xl mb-8">Secure your organization's data with modern, AI-powered storage.</p>
        <a
          href="#storage-overview"
          className="bg-blue-600 text-white px-8 py-3 rounded-xl shadow hover:bg-blue-700 text-lg transition"
        >
          Explore Dashboard
        </a>
        {/* Optionally, add your SVG or minimal illustration here */}
      </section>
    );
  }
  // Place <FrontIntro /> at the top of your main landing page (e.g., App.jsx)
  