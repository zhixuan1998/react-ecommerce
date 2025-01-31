import { useState, useEffect, useRef } from 'react';

function useMediaQuery(queries) {
    const matches = useRef([]);
    const [, forceUpdate] = useState(false);

    useEffect(() => {
        matches.current.length = 0;

        for (let i = 0; i < queries.length; i++) {
            matches.current.push(false);
        }

        const setMatches = () => {
            for (let i = 0; i < queries.length; i++) {
                const { maxWidth = null, minWidth = null } = queries[i];

                if (maxWidth === null && minWidth === null) {
                    matches.current[i] = false;
                    continue;
                }

                const widthIndicator = maxWidth ? 'max-width' : 'min-width';
                const widthValue = maxWidth ?? minWidth;

                const matchMedia = window.matchMedia(`(${widthIndicator}: ${widthValue})`);

                if (matches.current[i] === matchMedia.matches) continue;

                matches.current[i] = matchMedia.matches
            }

            forceUpdate(state => !state);
        };

        window.addEventListener('resize', setMatches);

        return () => window.removeEventListener('resize', setMatches);
    }, []);

    return matches.current;
}

export default useMediaQuery;
