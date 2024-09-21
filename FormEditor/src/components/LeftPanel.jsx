import React, { useState, useEffect } from 'react';

const LeftPanel = ({ sections, activeSection, addSection, updateSection, setActiveSectionId, removeSection, setStyleConfig }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [buttonText, setButtonText] = useState('');
  const [image, setImage] = useState('');
  const [showStyleEditor, setShowStyleEditor] = useState(false); // New state for style editor
  const [showAddSectionPopup, setShowAddSectionPopup] = useState(false); // Popup to add sections

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

  const handleStyleChange = (e) => {
    const { name, value } = e.target;
    setStyleConfig((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSectionClick = (type) => {
    addSection({ title, description, type, buttonText });
    setShowAddSectionPopup(false); // Close popup when section is added
  };

  return (
    <div className="w-1/4 p-6 bg-gray-100 min-h-screen relative shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-purple-700">Add Section</h2>
        <button
          onClick={() => setShowAddSectionPopup(!showAddSectionPopup)}
          className="bg-blue-500 text-white rounded-full h-10 w-10 flex items-center justify-center text-2xl shadow hover:bg-blue-600 transition"
        >
          +
        </button>
      </div>

      {showAddSectionPopup && (
        <div className="absolute bg-white p-4 shadow-lg rounded-lg w-full top-20 z-10">
          <h3 className="text-lg font-bold mb-2">Choose Section Type</h3>
          <button
            onClick={() => handleAddSectionClick('welcome')}
            className="block w-full py-2 text-left px-3 mb-2 rounded-lg bg-purple-100 hover:bg-purple-200 transition"
          >
            Welcome Section
          </button>
          <button
            onClick={() => handleAddSectionClick('email')}
            className="block w-full py-2 text-left px-3 rounded-lg bg-purple-100 hover:bg-purple-200 transition"
          >
            Email Section
          </button>
        </div>
      )}

      <h2 className="text-xl font-bold text-gray-700 mt-6">Added Sections</h2>
      <div className="space-y-3 mt-3">
        {sections.map((section) => (
          <div
            key={section.id}
            className={`p-4 rounded-lg shadow-md border hover:bg-gray-50 transition cursor-pointer ${
              activeSection?.id === section.id ? 'border-blue-500' : 'border-gray-200'
            }`}
            onClick={() => setActiveSectionId(section.id)}
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold">{section.title || 'Untitled Section'}</span>
              <button
                onClick={() => removeSection(section.id)}
                className="text-red-500 font-bold text-lg"
              >
                &times;
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => setShowStyleEditor(true)}
        className="mt-6 bg-purple-500 text-white py-2 px-4 rounded-lg shadow-lg w-full hover:bg-purple-600 transition"
      >
        Open Style Editor
      </button>

      {showStyleEditor && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold text-gray-700 mb-4">Style Editor</h2>
          <label className="block mb-3">
            Font Color:
            <input
              type="color"
              name="fontColor"
              onChange={handleStyleChange}
              className="ml-2 border p-1 rounded"
            />
          </label>
          <label className="block mb-3">
            Button Color:
            <input
              type="color"
              name="buttonColor"
              onChange={handleStyleChange}
              className="ml-2 border p-1 rounded"
            />
          </label>
          <label className="block mb-3">
            Font Type:
            <select
              name="fontType"
              onChange={handleStyleChange}
              className="ml-2 border p-1 rounded w-full"
            >
              <option value="">Select Font</option>
              <option value="Arial">Arial</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier New">Courier New</option>
              <option value="Georgia">Georgia</option>
            </select>
          </label>
          <button
            onClick={() => setShowStyleEditor(false)}
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg w-full hover:bg-green-600 transition"
          >
            Apply Styles
          </button>
        </div>
      )}

      {activeSection && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold text-gray-700 mb-4">Edit Section</h2>
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

          <button
            onClick={handleApplyChanges}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg w-full hover:bg-blue-600 transition"
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
};

export default LeftPanel;
