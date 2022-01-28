import React, { createContext, useContext } from "react";
import { useProductReducer } from './reducers'
const StoreContext = createContext();
const { Provider } = StoreContext;
const StoreProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useProductReducer({
      
        event: [],
    events: [{
        eventText: "dsadsadadasdas",
        eventTitle: "sdasdfsfa",
        startAddress: "dssfdafdas",
        endAddress: "dsfsdfsd",
        runDate: "05 / 04 / 2022",
        createdAt: "05 / 02 / 2022",
        username: "dasfdsfa"}],
        currentEvent: '1',

    });
    // use this to confirm it works!
    console.log(state);
    return <Provider value={[state, dispatch]} {...props} />;
};
const useStoreContext = () => {
    return useContext(StoreContext);
};
export { StoreProvider, useStoreContext };