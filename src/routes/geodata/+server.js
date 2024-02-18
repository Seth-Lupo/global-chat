import borders from "$lib/borders.json"
import { json } from "@sveltejs/kit";

function splitIntoDoubles(str) {
    var result = [];
    for (var i = 0; i < str.length; i += 2) {
        result.push(str.slice(i, i + 2));
    }
    return result;
}


export async function GET({ url }) {
	
    let res = {}
    let countryList = splitIntoDoubles(url.searchParams.get('codes'))

    console.log(countryList)
    
    for (let borderData of borders["features"]) {
        
        
        let code = borderData.properties.ISO_A2.toLowerCase();
        
    

        if (countryList.includes(code)) {
            res[code] = borderData
        }


      }


	return json(res);
}