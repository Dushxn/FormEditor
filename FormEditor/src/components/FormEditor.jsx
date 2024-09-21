//FormEditor
import React, { useState } from 'react';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';

const FormEditor = () => {
  const [sections, setSections] = useState([]);
  const [activeSectionId, setActiveSectionId] = useState(null);
  const [styleConfig, setStyleConfig] = useState({ fontColor: '', buttonColor: '', fontType: '' });

  const addSection = (section) => {
    const newSection = { ...section, id: Date.now().toString() };
    setSections((prevSections) => [...prevSections, newSection]);
  };

  const updateSection = (id, updatedSection) => {
    setSections((prevSections) =>
      prevSections.map((section) => (section.id === id ? updatedSection : section))
    );
  };

  const removeSection = (id) => {
    setSections((prevSections) => prevSections.filter((section) => section.id !== id));
    if (activeSectionId === id) setActiveSectionId(null);
  };

  const activeSection = sections.find((section) => section.id === activeSectionId);

  return (
    <div className="flex h-screen bg-gray-50">
      <LeftPanel
        sections={sections}
        activeSection={activeSection}
        addSection={addSection}
        updateSection={updateSection}
        setActiveSectionId={setActiveSectionId}
        removeSection={removeSection}
        setStyleConfig={setStyleConfig}
      />
      <RightPanel sections={sections} styleConfig={styleConfig} />
    </div>
  );
};

export default FormEditor;