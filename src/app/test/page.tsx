"use client";

import EditorComponent from "@/components/wyswyg-editor/editor-component";
//import dynamic from "next/dynamic";

//const DynamicComponent = dynamic(() => import("@/components/editor-component"), { ssr: false });

import "@/components/wyswyg-editor/index.css";
import { useEffect, useState } from "react";

const demoContent = "{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Kako se dodaje ☺️ emoji 🐝 radi sve.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Veliki \",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"font-size: 61px;\",\"text\":\"🦇\",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"font-size: 15px;\",\"text\":\"emoji bre.🫏\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textStyle\":\"font-size: 61px;\",\"textFormat\":0},{\"children\":[{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"\",\"text\":\"AKO JE OVO \",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"font-family: Trebuchet MS;\",\"text\":\"TREBUSHET \",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"font-family: Verdana;\",\"text\":\"ILI VERDANA\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"center\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"textFormat\":1,\"textStyle\":\"font-family: Trebuchet MS;\",\"tag\":\"h1\"},{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"},{\"children\":[{\"children\":[{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"TABELA\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":3,\"rowSpan\":1},{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"1\",\"type\":\"text\",\"version\":1}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":1,\"rowSpan\":1},{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"2\",\"type\":\"text\",\"version\":1}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":1,\"rowSpan\":1},{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"3\",\"type\":\"text\",\"version\":1}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":1,\"rowSpan\":1},{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"4\",\"type\":\"text\",\"version\":1}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":1,\"rowSpan\":1}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablerow\",\"version\":1},{\"children\":[{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"a\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":2,\"rowSpan\":1},{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"test\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":0,\"rowSpan\":1},{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":0,\"rowSpan\":1},{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":0,\"rowSpan\":1},{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":0,\"rowSpan\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablerow\",\"version\":1},{\"children\":[{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"b\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":2,\"rowSpan\":1},{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":0,\"rowSpan\":1},{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"adsasd\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":0,\"rowSpan\":1},{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":0,\"rowSpan\":1},{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"🦃\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":0,\"rowSpan\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablerow\",\"version\":1},{\"children\":[{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"c\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":2,\"rowSpan\":1},{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":0,\"rowSpan\":1},{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":0,\"rowSpan\":1},{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"vdsr\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":0,\"rowSpan\":1},{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":0,\"rowSpan\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablerow\",\"version\":1},{\"children\":[{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"d\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":2,\"rowSpan\":1},{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"😛\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"center\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"backgroundColor\":\"#50e3c2\",\"colSpan\":1,\"headerState\":0,\"rowSpan\":1},{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":0,\"rowSpan\":1},{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":0,\"rowSpan\":1},{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"er\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":0,\"rowSpan\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablerow\",\"version\":1,\"height\":81.3763427734375}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"table\",\"version\":1,\"colWidths\":[92,226.17137145996094,92,92,92]},{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textStyle\":\"font-size: 13px;\",\"textFormat\":0},{\"children\":[{\"children\":[{\"children\":[{\"type\":\"image\",\"version\":1,\"altText\":\"Neki alt text\",\"caption\":{\"editorState\":{\"root\":{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}},\"height\":275.12632812500004,\"maxWidth\":500,\"showCaption\":false,\"src\":\"https://t4.ftcdn.net/jpg/00/53/45/31/360_F_53453175_hVgYVz0WmvOXPd9CNzaUcwcibiGao3CL.jpg\",\"width\":389}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"layout-item\",\"version\":1},{\"children\":[{\"children\":[{\"type\":\"image\",\"version\":1,\"altText\":\"Coheseo\",\"caption\":{\"editorState\":{\"root\":{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}},\"height\":246,\"maxWidth\":500,\"showCaption\":false,\"src\":\"data:image/png;base64,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\",\"width\":246}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"layout-item\",\"version\":1}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"layout-container\",\"version\":1,\"templateColumns\":\"1fr 1fr\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Heading 1\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h1\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Heading 2\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h2\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Heading 3\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"heading\",\"version\":1,\"tag\":\"h3\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Normal text\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"},{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Bullet 1\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"listitem\",\"version\":1,\"value\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Bullet 2\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"listitem\",\"version\":1,\"value\":2},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Bullet 3\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"listitem\",\"version\":1,\"value\":3}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"list\",\"version\":1,\"listType\":\"bullet\",\"start\":1,\"tag\":\"ul\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Dosta vise buleta\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"},{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"},{\"children\":[{\"children\":[{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"number uno\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"listitem\",\"version\":1,\"value\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"due\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"listitem\",\"version\":1,\"value\":2},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"tre\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"listitem\",\"version\":1,\"value\":3}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"list\",\"version\":1,\"listType\":\"number\",\"start\":1,\"tag\":\"ol\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"layout-item\",\"version\":1},{\"children\":[{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Check 1\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"listitem\",\"version\":1,\"checked\":false,\"value\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Chek2\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"listitem\",\"version\":1,\"checked\":false,\"value\":2},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"chek3\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"listitem\",\"version\":1,\"checked\":false,\"value\":3}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"list\",\"version\":1,\"listType\":\"check\",\"start\":1,\"tag\":\"ul\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"layout-item\",\"version\":1},{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Ovo je bre quota nekog poznatog lika i sta vec dodjavola\",\"type\":\"text\",\"version\":1},{\"type\":\"linebreak\",\"version\":1},{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"-Ja-\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"quote\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"layout-item\",\"version\":1}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"layout-container\",\"version\":1,\"templateColumns\":\"1fr 1fr 1fr\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Code block 1\",\"type\":\"text\",\"version\":1},{\"type\":\"linebreak\",\"version\":1},{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"GoTo block2\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"code\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"\",\"text\":\"BOLD \",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":43,\"mode\":\"normal\",\"style\":\"color: #000000;font-size: 37px;\",\"text\":\"Sve\",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"color: #000000;font-size: 37px;\",\"text\":\" sta \",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":128,\"mode\":\"normal\",\"style\":\"color: #000000;font-size: 37px;background-color: #ffffff;\",\"text\":\"highlite\",\"type\":\"text\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"color: #000000;font-size: 37px;background-color: #ffffff;\",\"text\":\" \",\"type\":\"text\",\"version\":1}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"link\",\"version\":1,\"textStyle\":\"color: #000000;font-size: 37px;background-color: #ffffff;\",\"rel\":\"noreferrer\",\"target\":null,\"title\":null,\"url\":\"https://scordisc.com\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"color: #000000;font-size: 25px;background-color: #ffffff;\",\"text\":\"ovo \",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"link\",\"version\":1,\"textStyle\":\"color: #000000;font-size: 25px;background-color: #ffffff;\",\"rel\":\"noreferrer\",\"target\":null,\"title\":null,\"url\":\"https://scordisc.com\"},{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"color: #000000;font-size: 13px;background-color: #ffffff;\",\"text\":\"je link bio. Mozda treba da bude neke boje.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":1,\"textStyle\":\"color: #000000;font-size: 37px;\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1,\"textFormat\":1,\"textStyle\":\"color: #000000;font-size: 37px;\"}}"

export default function EditorPage() {
    const [initialContent, setInitialContent] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaveSuccessful, setSaveSuccessful] = useState<boolean | null>(null);



    // Save content to the server
    const handleSave = async (content: string): Promise<boolean> => {
        try {
            // Replace with your actual API call
            /*
            const response = await fetch('/api/content/123', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content }),
            });

            const success = response.ok;
            
            setSaveSuccessful(success);
            return success;
            */

            // Simulate a 2-second delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Simulate a successful response
            console.log('Content saved successfully');
            setSaveSuccessful(true);
            return true;

        } catch (error) {
            console.error('Error saving content:', error);
            setSaveSuccessful(false);
            return false;
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Editor</h1>
            
            {isSaveSuccessful === true && (
                <div className="mb-4 p-2 bg-green-100 text-green-800 rounded">
                    Content saved successfully!
                </div>
            )}
            
            {isSaveSuccessful === false && (
                <div className="mb-4 p-2 bg-red-100 text-red-800 rounded">
                    Failed to save content. Please try again.
                </div>
            )}
            
            <EditorComponent 
                content={initialContent}
                className="border rounded-lg p-2"
                onSave={handleSave}
            />
        </div>
    );
}
