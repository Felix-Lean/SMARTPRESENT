import { useState } from 'react';

interface Parameter {
  icon: string;
  title: string;
  description: string;
}

const parameters: Parameter[] = [
  {
    icon: "👤",
    title: "Zu Beschenkende Person",
    description: "Wer soll beschenkt werden? Je mehr Details, desto besser!"
  },
  {
    icon: "🎉",
    title: "Anlass",
    description: "Für welchen Anlass wird das Geschenk benötigt?"
  },
  {
    icon: "💰",
    title: "Budget",
    description: "Welches Preisbudget haben Sie im Sinn?"
  },
  {
    icon: "❤️",
    title: "Interessen",
    description: "Was mag die zu beschenkende Person? Hobbys, Vorlieben?"
  }
];

const GiftIcon = ({ isOpen, wasNeverOpened }: { isOpen: boolean; wasNeverOpened: boolean }) => (
  <svg
    className={`
      w-12 h-12 transition-transform duration-300
      ${isOpen 
        ? 'scale-110 rotate-12' 
        : `hover:scale-105 ${wasNeverOpened ? 'animate-wiggle' : ''}`
      }
    `}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M20 12v10H4V12" />
    <path d="M2 7h20v5H2z" />
    <path d="M12 22V7" />
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
  </svg>
);

export default function ParameterGuide() {
  const [isOpen, setIsOpen] = useState(false);
  const [wasNeverOpened, setWasNeverOpened] = useState(true);

  const handleClick = () => {
    if (wasNeverOpened) {
      setWasNeverOpened(false);
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col items-center">
        <button
          onClick={handleClick}
          className={`
            text-primary transition-colors duration-300 p-4 relative
            ${isOpen ? 'text-accent' : 'hover:text-accent'}
          `}
          aria-label="Zeige Tipps für bessere Geschenkvorschläge"
        >
          <GiftIcon isOpen={isOpen} wasNeverOpened={wasNeverOpened} />
          {!isOpen && wasNeverOpened && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-ping" />
          )}
        </button>

        <div
          className={`
            w-full overflow-hidden transition-all duration-500 ease-in-out
            ${isOpen ? 'max-h-[500px] opacity-100 mb-8' : 'max-h-0 opacity-0'}
          `}
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-medium text-gray-900 mb-2">
              Für die besten Geschenkvorschläge
            </h2>
            <p className="text-gray-600">
              Berücksichtigen Sie diese wichtigen Details in Ihrer Anfrage
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            {parameters.map((param, index) => (
              <div
                key={index}
                className={`
                  p-4 rounded-lg bg-white border border-gray-200
                  transition-all duration-300 delay-${index * 100}
                  ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[-10px]'}
                `}
              >
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">{param.icon}</div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">
                      {param.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {param.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 