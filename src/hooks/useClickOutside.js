import { useEffect } from 'react';

function useClickOutside(el, callback) {
    useEffect(() => {
        if (!(el instanceof HTMLElement) || typeof callback !== 'function') {
            return;
        }

        async function handleClickOutside(event) {
            if (event.composedPath().includes(el) === false) {
                await callback();
            }
        }

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [el]);
}

export default useClickOutside;
