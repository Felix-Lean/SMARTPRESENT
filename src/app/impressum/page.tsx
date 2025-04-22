import React from 'react';

export default function ImpressumPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Impressum</h1>
      
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Angaben gemäß § 5 TMG:</h2>
        <p>Felix Biergann<br />
        Milchborntalweg 42a<br />
        51429 Bergisch Gladbach</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Kontakt:</h2>
        <p>E-Mail: f.biergann@gmail.com</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</h2>
        <p>Felix Biergann<br />
        Milchborntalweg 42a<br />
        51429 Bergisch Gladbach</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Streitschlichtung:</h2>
        <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr/</a></p>
        <p className="mt-2">Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Haftung für Inhalte:</h2>
        <p>Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Haftung für Links:</h2>
        <p>Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.</p>
      </section>
    </div>
  );
} 