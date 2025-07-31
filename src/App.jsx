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

  const [modal, setModal] = useState(initModalValue);
  const [inTransitioning, setInTransitioning] = useState(false);

  useEffect(() => {
    auth.getUser();
  }, []);

  function hideModal() {
    dialogRef.current.close();
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

    dialogRef.current.showModal();
    setInTransitioning(true);
  }

  function resetModal() {
    setModal(initModalValue);
  }

  async function exitTransition() {
    setInTransitioning(false);
    await modal.onClose?.();
  }

  const contextValue = {
    hide: exitTransition,
    open: openModal
  };

  const dialogRef = useRef();

  return (
    <ModalContext.Provider value={contextValue}>
      <div className="app-container">
        <Outlet />
        <Transition
          nodeRef={dialogRef}
          in={inTransitioning}
          timeout={transitionDurationInMs}
          onExited={hideModal}
        >
          {(state) => {
            const isEntering = state === 'entering';
            const isExiting = state === 'exiting';

            return (
              <dialog
                className={`dialog${isEntering ? ' bounce-enter-active' : ''}${
                  isExiting ? ' bounce-leave-active' : ''
                }`}
                ref={dialogRef}
              >
                <div className="title">{modal.title}</div>
                <div className="body">{modal.message}</div>
                <button className="button" onClick={() => exitTransition()}>
                  {modal.buttonText}
                </button>
              </dialog>
            );
          }}
        </Transition>
      </div>
    </ModalContext.Provider>
  );
}

export default App;
