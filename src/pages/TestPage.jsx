import React from 'react';
import Mbutton from '../components/Mbutton';

const TestPage = () => {
  const handleEdit = () => {};

  const handleCreate = () => {};

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Mbutton 테스트 페이지</h1>
      <div className="space-y-4">
        <Mbutton variant="edit" onClick={handleEdit}></Mbutton>
        <Mbutton variant="create" onClick={handleCreate}></Mbutton>
      </div>
    </div>
  );
};

export default TestPage;
