// page.tsx
import React, { useState } from 'react';
import Layout from './layout';
import { useRouter } from 'next/router';
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const Page = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFile(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/remove-background', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setProcessedImage(response.data.imageUrl);
    } catch (error) {
      console.error('Error processing image:', error);
    }
  };

  return (
    <Layout>
      <h2>Upload an Image to Remove Background</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} required />
        <button type="submit">Remove Background</button>
      </form>
      {file && (
        <div>
          <h3>Original Image:</h3>
          <img src={URL.createObjectURL(file)} alt="Original" width="300" />
        </div>
      )}
      {processedImage && (
        <div>
          <h3>Processed Image:</h3>
          <img src={processedImage} alt="Processed" width="300" />
        </div>
      )}
    </Layout>
  );
};

export default Page;
