import React from 'react';
import PropTypes from 'prop-types';
import {Highlight, defaultProps } from 'prism-react-renderer';
import {themes} from 'prism-react-renderer';

const CodeSnippet = ({ language, children }) => {
  return (
    <Highlight theme={themes.nightOwl} code={children.trim()} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style, padding: '20px', overflowX: 'auto' }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}

CodeSnippet.propTypes = {
  language: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default CodeSnippet;