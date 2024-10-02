import React, { useState } from 'react';
import FileUpload from '../../assets/SearchResult/FileUpload';

const ImageSearch: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="image-upload">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }} 
        id="file-upload" 
      />
      <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
        <FileUpload />
      </label>
      {/* <div>
        {selectedImage && (
          <p>Image uploaded successfully!</p> 
        )}
      </div> */}
    </div>
  );
};

export default ImageSearch;
