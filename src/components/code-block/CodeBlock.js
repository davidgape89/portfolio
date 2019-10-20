import React, {useEffect} from 'react';

export default (props) => {
    // Rerun code-prettify when updated 
    useEffect(() => window.PR.prettyPrint());

    return (
        <pre className="prettyprint linenums">
            <code className="javascript">
                {props.value}
            </code>
        </pre>
    );
}