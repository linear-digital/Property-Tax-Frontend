import { Plus } from "lucide-react";
import Filter from "./Filter";



const ManageProperties = () => {
    return (
        <div className="py-5">
            <button className="bg-accent py-2 px-5 rounded-md text-sm text-white flex items-center gap-x-1 cursor-pointer" >
              <Plus fontSize={10}/>  Add New Property 
            </button>
            <Filter />
        </div>
    );
};

export default ManageProperties;