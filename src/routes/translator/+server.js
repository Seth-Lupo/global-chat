import borders from "$lib/borders.json"
import { json } from "@sveltejs/kit";

import t from '@google-cloud/translate';

export async function GET({ url }) {

    let text = url.searchParams.get('text')
    let language = url.searchParams.get('language')

    console.log(text, language)

    const projectId = "global-chat-414717"
    const key = "AIzaSyDh2Ed_zKW_mUzEzw2ndKoubeYhm1IEfCo"

    const translate = new t.v2.Translate({
        projectId: projectId,
        key: key,
    });

    

    const [translation] = await translate.translate(text, language);
        
	return new Response(translation);

}

