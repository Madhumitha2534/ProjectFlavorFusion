import React from 'react';
import styled from 'styled-components';

const ConfirmationModal = ({ isOpen, onConfirm, onReject }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>Confirm Registration</ModalHeader>
        <ModalBody>
          Are you sure you want to register for this contest?
        </ModalBody>
        <ModalFooter>
          <Button onClick={onConfirm}>Yes</Button>
          <Button onClick={onReject}>No</Button>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ConfirmationModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  width: 300px;
`;

const ModalHeader = styled.h2`
  margin: 0 0 10px 0;
`;

const ModalBody = styled.p`
  margin: 10px 0;
`;

const ModalFooter = styled.div`
  margin-top: 20px;
`;

const Button = styled.button`
  background: #ff6f00;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 10px;

  &:hover {
    background: #ff8f00;
  }
`;
