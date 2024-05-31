import DataContext from "../DataContext";

const ProviderData = ({ children, data }) => {

     return (
          <DataContext.Provider value={data}>
               {children}
          </DataContext.Provider>
     );
};

export default ProviderData;