'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import OpenAI from 'openai';

// Define the interface for email data
interface Emaildt {
    label: string[];
    subject: string;
    body: string;
}

export default function Emailclass() {
    const [count, setCount] = useState(false);
    const [selectedValue, setSelectedValue] = useState(10);
    const [emailalldata, setEmailalldata] = useState<Emaildt[]>([]);
    const [classifieddata, setClassifieddata] = useState<string[]>([]);
    const [openai, setOpenai] = useState<any>(null);

    // Handle dropdown change
    const handleDropdownChange = (e: any) => {
        setSelectedValue(e.target.value);
    };

    // Fetch OpenAI API key and initialize OpenAI instance
    useEffect(() => {
        const storedKey = localStorage.getItem('openaikey');
        if (storedKey) {
            setOpenai(new OpenAI({
                apiKey: storedKey,
                dangerouslyAllowBrowser: true
            }));
        }
    }, []);

    // Function to handle login
    const fetchmails = () => {
        fetchEmail(selectedValue);
    };

    // Function to fetch and classify emails
    const fetchEmail = async (val: number) => {
        try {
            const resp = await axios.get(`http://localhost:3000/api/v1/emailclassifier/oauth2callback?count=${val}`, {
                withCredentials: true
            });
            const emailData: Emaildt[] = [];
            const classifiedArr: string[] = [];

            // Classify each email
            await Promise.all(resp.data.map(async (dt: any) => {
                const label = dt.labels;
                const subject = dt.subject;
                const bodyenc = dt.body;
                const bodydec = Buffer.from(bodyenc, 'base64').toString('utf-8');
                const completion: any = await openai.completions.create({
                    model: 'gpt-3.5-turbo-instruct',
                    prompt: `Classify the following email subject into one of the following categories: Important, Promotions, Social, Marketing, Spam. Provide only the category name as the response.
                    Email subject: "${subject}"`,
                    max_tokens: 6,
                    temperature: 0.8,
                });

                emailData.push({ label, subject, body: bodydec });
                classifiedArr.push(completion.choices[0].text.trim());
            }));

            setEmailalldata(emailData);
            setClassifieddata(classifiedArr);
        } catch (error) {
            console.error('Error fetching emails:', error);
        }
    };
    return (
        <div>
            <img src={localStorage.getItem('userpic')||''} alt="image of user"/>
            <h1>{localStorage.getItem('username')}</h1>
            <label className="m-2" htmlFor="valueSelect">No of Emails</label>
            <select id="valueSelect" value={selectedValue} onChange={handleDropdownChange} className="border border-gray-300 p-2 bg-black rounded m-4">
                {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((value) => (
                    <option key={value} value={value}>
                        {value}
                    </option>
                ))}
            </select>
                <button onClick={fetchmails}>Get me the email</button>
        
            <div>
                {classifieddata.map((category: string, index: number) => (
                    <div key={index}>
                        {category}
                    </div>
                ))}
            </div>
        </div>
    );
}
