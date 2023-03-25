import React, { useState } from 'react';

interface Section {
  id: number;
  title: string;
}

const sections: Section[] = [
  { id: 1, title: 'Problem' },
  { id: 2, title: 'Solution' },
  { id: 3, title: 'Demo' },
  { id: 4, title: 'Features' },
  { id: 5, title: 'Team' },
  { id: 6, title: 'Ending' },
];

const Carousel: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>(sections[0]);

  const goToPrevious = () => {
    const currentIndex = sections.findIndex((section) => section.id === activeSection.id);
    if (currentIndex > 0) {
      setActiveSection(sections[currentIndex - 1]);
    }
  };

  const goToNext = () => {
    const currentIndex = sections.findIndex((section) => section.id === activeSection.id);
    if (currentIndex < sections.length - 1) {
      setActiveSection(sections[currentIndex + 1]);
    }
  };

  return (
    <div className="relative">
      <div className="w-full h-full transition duration-300 ease-in-out">
        <div className="text-3xl font-bold">{activeSection.title}</div>
        {activeSection.id === 1 && (
          <div className="section-content">
             Fragmented onboarding
          </div>
        )}
        {activeSection.id === 2 && (
          <div className="section-content">
            POAPcet description
          </div>
        )}

        {activeSection.id === 3 && (
          <div className="section-content">
            Diagram and demo
          </div>
        )}

        {activeSection.id === 4 && (
          <div className="section-content">
            Made with 
          </div>
        )}

        {activeSection.id === 5 && (
          <div className="section-content">
            Team
          </div>
        )}

        {activeSection.id === 6 && (
          <div className="section-content"> 
            POAPcet.zenbit.mx
          </div>
        )}
      </div>

      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:text-white hover:bg-red-500 text-2xl m-auto h-10 w-10 rounded-full shadow-md items-center grid text-center"
        onClick={goToPrevious}
      >
        ◀
      </button>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:text-white hover:bg-red-500 text-2xl  m-auto h-10 w-10 rounded-full shadow-md items-center grid text-center"
        onClick={goToNext}
      >
        ►
      </button>
    </div>
  );
};

export default Carousel;
