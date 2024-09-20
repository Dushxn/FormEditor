import React, { useState, useEffect } from 'react';

const LeftPanel = ({ sections, activeSection, addSection, updateSection, setActiveSectionId, removeSection }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [buttonText, setButtonText] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (activeSection) {
      setTitle(activeSection.title);
      setDescription(activeSection.description);
      setButtonText(activeSection.buttonText);
      setImage(activeSection.image || ''); // Load existing image if available
    } else {
      resetFields();
    }
  }, [activeSection]);

  const resetFields = () => {
    setTitle('');
    setDescription('');
    setButtonText('');
    setImage('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        if (activeSection) {
          const updatedSection = {
            ...activeSection,
            image: reader.result,
          };
          updateSection(activeSection.id, updatedSection);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyChanges = () => {
    setActiveSectionId(null);
  };

  return (
    <div className="w-1/4 p-4 bg-gray-100">
      {!activeSection ? (
        <div>
          <h2 className="text-lg font-bold mb-4">Add Section</h2>
          <button onClick={() => addSection({ title, description, type: 'welcome', buttonText })} className="block mb-2">Add Welcome Section</button>
          <button onClick={() => addSection({ title, description, type: 'email' })} className="block">Add Email Section</button>

          <h2 className="text-lg font-bold mt-4">Added Sections</h2>
          {sections.map((section) => (
            <div key={section.id} className="flex items-center justify-between p-2 border rounded mb-2 cursor-pointer">
              <span onClick={() => setActiveSectionId(section.id)}>{section.title || 'Untitled Section'}</span>
              <button onClick={() => removeSection(section.id)} className="text-red-500">-</button>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h2 className="text-lg font-bold mb-4">Edit Section</h2>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              updateSection(activeSection.id, { ...activeSection, title: e.target.value });
            }}
            className="mb-2 px-3 py-2 border rounded w-full"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              updateSection(activeSection.id, { ...activeSection, description: e.target.value });
            }}
            className="mb-2 px-3 py-2 border rounded w-full"
          ></textarea>

          {activeSection.type === 'welcome' && (
            <>
              <input
                type="text"
                placeholder="Button Text"
                value={buttonText}
                onChange={(e) => {
                  setButtonText(e.target.value);
                  updateSection(activeSection.id, { ...activeSection, buttonText: e.target.value });
                }}
                className="mb-2 px-3 py-2 border rounded w-full"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mb-2"
              />
            </>
          )}

          <button onClick={handleApplyChanges} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
            Apply
          </button>
        </div>
      )}
    </div>
  );
};

export default LeftPanel;
