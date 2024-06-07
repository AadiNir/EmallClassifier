'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import OpenAI from 'openai';

export default function Emailclass() {
    const [count, setCount] = useState(0);
   const [selectedValue,setselectedvalue] = useState(10);
   const [emailalldata,setemaialldata]=useState<any>([]);
   const [classifieddata,setclassifiedata]=useState<any>([]);
   const handleDropdownChange=(e:any)=>{
    setselectedvalue(e.target.value)
   }
//    useEffect(() => {
//     // Access localStorage only when the component is mounted on the client side
   
// }, []);
const storedKey = localStorage.getItem('openaikey');
let openai= new OpenAI({
    apiKey: storedKey,
    dangerouslyAllowBrowser: true
});
    

    interface emaildt {
        label: string[],
        subject: string,
        body:string
    }
    async function login() {
        let code = localStorage.getItem('oauth-token');
        try {
            if (count === 0) {
                await axios.get('http://localhost:3000/newoauthcallbacknew', {
                    withCredentials: true // Include credentials (cookies) in the request
                });
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    }

    async function fetchemail(val: number) {
        const resp = await axios.get(`http://localhost:3000/api/v1/emailclassifier/oauth2callback?count=${val}`, {
            withCredentials: true // Include credentials (cookies) in the request
        });
       let arr:any[] = [];
       let emaildata:any[]=[];
        resp.data.map(async (dt:any)=>{
            let label = dt.labels;
            let subject = dt.subject;
            let bodyenc = dt.body;
            const bodydec = Buffer.from(bodyenc, 'base64').toString('utf-8');
             const completion:any = await openai.completions.create({
            model: 'gpt-3.5-turbo-instruct',
            prompt: `Classify the following email subject into one of the following categories: Important, Promotions, Social, Marketing, Spam. Provide only the category name as the response.
            Email subject: "${subject}"
            `,
            max_tokens: 6,
            temperature: 0.8,
        });
        emaildata.push({
            labels:label,
            subj:subject,
            body:bodydec
        })
        arr.push(completion.choices[0].text)
        })
        setemaialldata(emaildata);
        setclassifiedata(arr);
    }

    return (
        <div>
            <label className="m-2" htmlFor="valueSelect">No of Emails</label>
        <select id="valueSelect" value={selectedValue} onChange={handleDropdownChange} className="border border-gray-300 p-2 bg-black rounded m-4">
            {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((value) => (
            <option key={value} value={value}>
                {value}
            </option>
        ))}
      </select>
            <h1>Logging in...</h1>
            <button onClick={login}>hoijsidwjiowi</button>
            <button onClick={() => fetchemail(20)}>Get me the subject</button>
        </div>
    );
}
