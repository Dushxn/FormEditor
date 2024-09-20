import React from 'react';

const SectionList = ({ sections, setActiveSectionId, removeSection }) => {
  return (
    <div className="mt-4">
      <h3>Sections</h3>
      {sections.map((section) => (
        <div key={section.id} className="flex justify-between items-center border p-2 my-2 bg-white">
          <span onClick={() => setActiveSectionId(section.id)} className="cursor-pointer">
            {section.title || 'Untitled Section'}
          </span>
          <button
            className="bg-red-500 text-white px-2 py-1 rounded"
            onClick={() => removeSection(section.id)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default SectionList;
