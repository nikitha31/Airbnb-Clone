const axios = require('axios');

export async function GetServices(prop_id) {

    try{
        const response = await axios.get('/properties/'+prop_id);
        console.log('response  ', response)
        return response.data;
    }catch(error) {
        return [];
    }
    
}