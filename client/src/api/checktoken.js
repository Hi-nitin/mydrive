import { getapi } from "./getpost";
import myurl from '../serverurl/url'
const serverurl=myurl;

const tokenchecker=async()=>{

   
    
    const tokendata= await getapi(serverurl+'/tokenchecker')
const result= await tokendata;
return result;


}


export default tokenchecker;
