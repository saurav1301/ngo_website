import React, { useState } from 'react';

const useEventForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    description: '',
    image: null,
    startDate: '',
    endDate: '',
  });

  const [formErrors, setFormErrors] = useState({
    title: '',
    location: '',
    description: '',
    image: '',
    dateError: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0], // Store the uploaded image file
    }));
  };

  const validateForm = () => {
    let valid = true;
    const errors = {
      title: '',
      location: '',
      description: '',
      image: '',
      dateError: '',
    };

    if (!formData.title.trim()) {
      errors.title = 'Title is required';
      valid = false;
    }
    if (!formData.location.trim()) {
      errors.location = 'Location is required';
      valid = false;
    }
    if (!formData.description.trim()) {
      errors.description = 'Description is required';
      valid = false;
    }
    if (!formData.image) {
      errors.image = 'Image upload is required';
      valid = false;
    }

    // Validate date
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    if (!formData.startDate || !formData.endDate) {
      errors.dateError = 'Both start date and end date are required';
      valid = false;
    } else if (startDate > endDate) {
      errors.dateError = 'Start date cannot be greater than end date';
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  return {
    formData,
    formErrors,
    handleInputChange,
    handleImageChange,
    validateForm,
    setFormData
  };
};

export default useEventForm;
