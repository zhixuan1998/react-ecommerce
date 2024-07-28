import './App.scss';

import { useState, useRef, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Transition } from 'react-transition-group';

import { useAuth } from '@/hooks';
import { noop } from '@/utils/is';
import { ModalContext } from '@/utils/context';
import messages from '@/models/businessMessages';

const initModalValue = {
  title: '',
  message: '',
  buttonText: '',
  onClose: noop
};

const transitionDurationInMs = 300;

function App() {
  const auth = useAuth();

  const modalContainerRef = useRef(null);
  const [modal, setModal] = useState(initModalValue);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inTransitioning, setInTransitioning] = useState(false);

  const modalDisplay = isModalVisible ? 'flex' : 'none';

  useEffect(() => {
    auth.getUser();
  }, []);

  function hideModal() {
    setIsModalVisible(false);
    resetModal();
  }

  function openModal(obj) {
    const {
      title = messages.error.title.oops(),
      message = messages.error.message.general(),
      buttonText = messages.button.ok(),
      onClose = noop
    } = obj ?? {};

    setModal({ title, message, buttonText, onClose });

    setIsModalVisible(true);
    setInTransitioning(true);
  }

  function resetModal() {
    setModal(initModalValue);
  }

  function exitTransition() {
    setInTransitioning(false);
  }

  const contextValue = {
    hide: exitTransition,
    open: openModal
  };

  return (
    <ModalContext.Provider value={contextValue}>
      <div className="app-container">
        <Outlet />
        <div className="modal-overlay" style={{ display: modalDisplay }}>
          <Transition
            nodeRef={modalContainerRef}
            in={inTransitioning}
            timeout={transitionDurationInMs}
            onExited={hideModal}
          >
            {(state) => {
              const isEntering = state === 'entering';
              const isExiting = state === 'exiting';

              return (
                <div
                  className={`modal-container ${isEntering ? 'bounce-enter-active' : ''} ${
                    isExiting ? 'bounce-leave-active' : ''
                  }`}
                  ref={modalContainerRef}
                >
                  <div className="title">{modal.title}</div>
                  <div className="body">{modal.message}</div>
                  <div
                    className="button"
                    onClick={() => {
                      exitTransition();
                      modal.onClose();
                    }}
                  >
                    {modal.buttonText}
                  </div>
                </div>
              );
            }}
          </Transition>
        </div>
      </div>
    </ModalContext.Provider>
  );
}

export default App;
