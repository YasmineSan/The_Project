import React from 'react';

export const FormField = ({ label, type, value, onChange, required }) => (
  <div className="mb-4">
    <label className="block text-gray-700">{label}{required && ' *'}</label>
    <input
      type={type}
      className="w-full px-3 py-2 border rounded"
      value={value}
      onChange={onChange}
      required={required}
    />
  </div>
);

export default FormField;
