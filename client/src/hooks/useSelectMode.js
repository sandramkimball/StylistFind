import {useLocalStorage} from './useLocalStorage';
import {useEffect} from 'react';

export const useSelectMode = (menuMode) => {
    const [modeValue, setModeValue] = useLocalStorage(menuMode);

    useEffect(()=>{
        // e.preventDefault();
        if(modeValue === true){
            document.querySelector('option').classList.add('select-mode');
        } else {
            document.querySelector('option').classList.remove('select-mode');
        }
    })

    return [modeValue, setModeValue]
};