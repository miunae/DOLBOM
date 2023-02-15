import './styles.css';

import React, { useEffect, useRef, useState } from 'react';

const RoomJoin = () => {
  const useConfirm = (message = null, onConfirm, onCancel) => {
    if (!onConfirm || typeof onConfirm !== 'function') {
      return;
    }
    if (onCancel && typeof onCancel !== 'function') {
      return;
    }

    const confirmAction = () => {
      if (window.confirm(message)) {
        onConfirm();
      } else {
        onCancel();
      }
    };

    return confirmAction;
  };
  const deleteConfirm = () => console.log('삭제했습니다.');
  const cancelConfirm = () => console.log('취소했습니다.');
  const confirmDelete = useConfirm('삭제하시겠습니까?', deleteConfirm, cancelConfirm);
  return (
    <div className="App">
      <button onClick={confirmDelete}>게시글 삭제</button>
    </div>
  );
};

export default RoomJoin;
