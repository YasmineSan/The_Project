import React from 'react';

const FormField = ({ label, type, value, onChange, required }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2">{label}</label>
      {type === 'textarea' ? (
        <textarea
          className="w-full px-3 py-2 border rounded"
          value={value}
          onChange={onChange}
          required={required}
        />
      ) : (
        <input
          type={type}
          className="w-full px-3 py-2 border rounded"
          value={value}
          onChange={onChange}
          required={required}
        />
      )}
    </div>
  );
};

export default FormField;
