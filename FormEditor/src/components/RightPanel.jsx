import React, { useState } from 'react';

const RightPanel = ({ sections, styleConfig }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  // Function to validate the email format
  const validateEmail = (email) => {
    // Check for the presence of "@" and "."
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    // Validate email on change
    if (!validateEmail(emailValue)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError(''); // Clear error if valid
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
            style={{
              color: styleConfig.fontColor,
              fontFamily: styleConfig.fontType,
            }}
          >
            <div className="flex-grow ml-[110px]">
              <h3 className="text-[40px] sm:text-[60px] md:text-[80px] font-bold">
                {section.title || 'Title'}
              </h3>
              <p className="text-lg">{section.description || 'Description'}</p>

              {/* Welcome section button */}
              {section.type === 'welcome' && (
                <button
                  className="mt-4 px-6 py-3 text-white rounded-lg"
                  style={{
                    backgroundColor: styleConfig.buttonColor || '#333',
                  }}
                >
                  {section.buttonText || 'Click Me'}
                </button>
              )}

              {/* Email section input field */}
              {section.type === 'email' && (
                <div className="mt-4">
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email"
                    className="px-4 py-2 border rounded-lg w-full"
                    style={{
                      borderColor: emailError ? 'red' : '#ccc',
                      borderWidth: emailError ? '2px' : '1px',
                    }}
                  />
                  {emailError && <p className="text-red-500 mt-1">{emailError}</p>}
                </div>
              )}
            </div>

            {/* Image display */}
            <div className="mr-[100px]">
              {section.image && (
                <img
                  src={section.image}
                  alt="Uploaded"
                  className="mr-[150px] rounded-lg w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] md:w-[400px] md:h-[400px] object-cover"
                />
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RightPanel;
