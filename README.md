# React Not Typist

React component for cycling through different strings. A lot of similar
components will cycle through with a typing animation. This component offers a
different style.

<!-- Animated gif of text rotation -->

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
            Lets get a <NotTypist words={['Water', 'Soda Water', 'Banana']} />.
        </p>
    )
}
```