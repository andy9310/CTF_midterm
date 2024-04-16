import React, { createContext, useState } from 'react'
export const SampleContext = createContext()
const SampleContextProvider = (props) => {
    const [userid, setUserid] = useState(10000);
    return (
         <SampleContext.Provider 
            value={{
                userid,
                setUserid,
             }}>
               {props.children}
         </SampleContext.Provider>
    )
}
export default SampleContextProvider;