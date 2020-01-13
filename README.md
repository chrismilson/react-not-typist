# React Not Typist

React component for cycling through different strings. A lot of similar
components will cycle through with a typing animation. This component offers a
different style.

<img src="demo/demo.gif" alt="The component in action" height=100 />

## Installation

```bash
npm install react-not-typist --save
```

## Usage

```jsx
import NotTypist from 'react-not-typist';

function Plans (props) {
  return (
    <p>
      That was <NotTypist 
        words={[
          'exciting',
          'interesting',
          'frightening'
        ]}
      />.
    </p>
  )
}
```