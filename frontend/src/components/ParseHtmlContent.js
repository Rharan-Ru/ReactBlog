import React from 'react';
import parse from 'html-react-parser';


const ParseHtml = (htmlContent) => {
    return (
        parse(htmlContent, {
            replace: domNode => {
                if (domNode && String(domNode.name).indexOf('h') !== -1) {
                    return <span>{String(domNode.children[0].data)}</span>
                    // return console.log(domNode.children[0].data)
                }
                else if (domNode && String(domNode.name).indexOf('p') !== -1) {
                    return <span>{String(domNode.children[0].data)}</span>
                }
            }
        })
    );
};

export default ParseHtml;