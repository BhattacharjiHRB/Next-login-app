

import { Circles, Watch } from "react-loader-spinner";


export default function Spinner(){
    return(
        <div>
            <Circles 
                height="80"
                width="80"
                color="#00030"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    )
}

