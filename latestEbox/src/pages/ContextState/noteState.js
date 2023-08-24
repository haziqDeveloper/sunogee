import React from 'react'

import stateContext from './stateContext';

const NoteState = (props) =>
{

const [isOpen, setIsOpen] = useState(false);

return(
   <stateContext.Provider value={isOpen}>
       {props.children}
   </stateContext.Provider>
)
} 

export default NoteState