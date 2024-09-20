import React, { useState } from 'react';

const RightPanel = ({ sections }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (!validateEmail(newEmail)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  return (
    <div className="w-3/4 p-4 bg-gray-50 overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Preview</h2>
      {sections.length === 0 ? (
        <p className="text-gray-500">No sections added yet. Add sections to preview them here.</p>
      ) : (
        sections.map((section) => (
          <div
            key={section.id}
            className="h-screen flex items-center justify-between mb-6 p-4 border rounded-lg shadow-md bg-white"
          >
            <div className="flex-grow ml-[150px]">
              <h3 className="text-[40px] sm:text-[60px] md:text-[80px] font-bold">{section.title || 'Title'}</h3>
              <p className="text-xl sm:text-2xl md:text-3xl ml-2">{section.description || <>Description</>}</p>
              {section.type === 'welcome' && (
                <button className="mt-4 px-3 py-2 bg-blue-500 text-white rounded text-sm sm:text-base md:text-lg">
                  {section.buttonText || 'Start'}
                </button>
              )}
              {section.type === 'email' && (
                <div>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                    className={`border p-2 rounded w-full mt-4 ${emailError ? 'border-red-500' : ''}`}
                  />
                  {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                </div>
              )}
            </div>
            {section.image && (
              <div className="ml-2">
                <img
                  src={section.image}
                  alt="Uploaded"
                  className="mr-[150px] rounded-lg w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] md:w-[400px] md:h-[400px] object-cover"
                />
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default RightPanel;
