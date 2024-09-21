import React from 'react';

const SectionEditor = ({ section, updateSection, setActiveSectionId }) => {
  const handleTitleChange = (e) => {
    const updatedSection = { ...section, title: e.target.value };
    updateSection(section.id, updatedSection); // Real-time update
  };

  const handleDescriptionChange = (e) => {
    const updatedSection = { ...section, description: e.target.value };
    updateSection(section.id, updatedSection); // Real-time update
  };

  const handleApply = () => {
    // Revert to default section list view
    setActiveSectionId(null);
  };

  return (
    <div className="mt-4">
      <h3>Edit Section</h3>
      <div className="mt-2">
        <label className="block font-bold">Title:</label>
        <input
          type="text"
          value={section.title}
          onChange={handleTitleChange}
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="mt-2">
        <label className="block font-bold">Description:</label>
        <textarea
          value={section.description}
          onChange={handleDescriptionChange}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Apply button to go back to default screen */}
      <button
        className="bg-green-500 text-white px-3 py-2 rounded mt-4"
        onClick={handleApply}
      >
        Apply Changes
      </button>
    </div>
  );
};

export default SectionEditor;
