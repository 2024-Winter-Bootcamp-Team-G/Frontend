import React from 'react';
import Mbutton from '../components/Mbutton';
import Button from '../components/Button';
import Mpopup from '../components/Mpopup';
import Loading from '../components/Loading';

const TestPage = () => {
  const handleEdit = () => {};

  const handleCreate = () => {};
  const handleButtonClick = () => {};

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Mbutton 및 Button 테스트 페이지
      </h1>

      {/* Mbutton 테스트 섹션 */}
      <div className="space-y-4 mb-8">
        <h2 className="text-xl font-semibold mb-2">Mbutton 컴포넌트</h2>
        <div className="space-y-2">
          <Mbutton variant="edit" onClick={handleEdit} />
          <Mbutton variant="create" onClick={handleCreate} />
        </div>
      </div>

      {/* Button 테스트 섹션 */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-2">Button 컴포넌트</h2>
        <div className="space-y-2">
          <Button
            type="default"
            onClick={() => handleButtonClick('기본 버튼 클릭!')}
            className="mb-4"
          >
            기본 버튼
          </Button>
          <Button
            type="x"
            onClick={() => handleButtonClick('X 버튼 클릭!')}
            className="mb-4"
          >
            X
          </Button>
          <Button
            type="popup"
            onClick={() => handleButtonClick()}
            className="mb-4"
          >
            팝업
          </Button>
          <Button
            type="ok"
            onClick={() => handleButtonClick()}
            className="mb-4"
          >
            확인
          </Button>
        </div>
      </div>

      {/* Mpopup 테스트 섹션 */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-2">Mpopup 컴포넌트</h2>
        <div className="space-y-2">
          <Mpopup variant="subscribe" className="mb-4" />
          <Mpopup variant="youlogin" className="mb-4" />
          <Mpopup variant="profile" className="mb-4" />
        </div>
      </div>

      {/* Loading 테스트 섹션 */}
      <div className="space-y-4 mb-8">
        <h2 className="text-xl font-semibold mb-2">Loading 컴포넌트</h2>
        <div className="space-y-2">
          <Loading />
        </div>
      </div>
    </div>
  );
};

export default TestPage;
