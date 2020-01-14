import React from 'react'
import PropTypes from 'prop-types'
import edit from './edit'
import './style.css'

/**
 * A Changer is a component that takes two props:
 *
 * - from, and
 * - to.
 *
 * It will first display the from character, and then morph into the second
 * character.
 *
 * @param {*} props
 */
class Changer extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      fromWidth: 0,
      toWidth: 0
    }

    this.from = React.createRef()
    this.to = React.createRef()
  }

  /**
   * On mount, get the width of each character and store the value.
   */
  componentDidMount () {
    var fromWidth = this.from.current.offsetWidth
    var toWidth = this.to.current.offsetWidth

    this.setState({ fromWidth, toWidth })
    this.calculated = true
  }

  /**
   * Use the stored width values as variable inputs into the styles and animate
   * with these variables.
   *
   * We don't want any characters to overlap. So we first make the growing
   * characters grow, then we fade all the characters at the same time, and then
   * we make the shrinking characters shrink. This is controlled with the
   * animation delay.
   */
  render () {
    const { from, to } = this.props
    const { fromWidth, toWidth } = this.state

    return (
      <span
        className='Changer'
        style={this.calculated && {
          '--from-width': fromWidth + 'px',
          '--to-width': toWidth + 'px',
          animationDelay: (fromWidth < toWidth ? 0 : 2) + 's'
        }}
      >
        <span
          ref={this.from}
          className={'from' + (from === ' ' ? ' space' : '')}
        >{ from === ' ' ? 't' : from }</span>
        <span
          ref={this.to}
          className={'to' + (to === ' ' ? ' space' : '')}
        >{ to === ' ' ? 't' : to }</span>
      </span>
    )
  }
}

/**
 * A react text carousel that performs different character operations on strings
 * to transform them from one into another. When supplied with an array of
 * strings, it will rotate through displaying each of the strings, and the
 * transition between the strings is based on the Levenshtein distance between
 * the strings.
 */
class NotTypist extends React.Component {
  constructor (props) {
    super(props)

    this.state = { display: [] }

    /**
     * a variable to make sure that react knows the props are not just being
     * updated, and it should render a new component to the DOM.
     */
    this.key = 0

    /**
     * This is the index of the currently displayed word in props.words
     */
    this.cur = 0
  }

  componentDidMount () { this.next() }

  componentWillUnmount () { clearInterval(this.timeout) }

  next () {
    // If there are less than two words there is nothing to cycle through.
    if (this.props.words.length < 2) return
    const next = (this.cur + 1) % this.props.words.length

    const from = this.props.words[this.cur]
    const to = this.props.words[next]

    this.setState({ display: edit(from, to) })
    this.cur = next // update cur

    this.timeout = setTimeout(() => this.next(), 4000)
  }

  render () {
    if (this.props.words.length < 1) return null
    return (
      <span className='NotTypist' aria-label={this.props.words[this.cur]}>
        {
          // if theres only one word we dont need to change anything
          this.props.words.length === 1
            ? this.props.words[this.cur]
            : this.state.display.map(move => (
              <Changer key={this.key++} from={move.from} to={move.to} />
            ))
        }
      </span>
    )
  }
}

NotTypist.propTypes = {
  words: PropTypes.arrayOf(PropTypes.string).isRequired,
  className: PropTypes.string,
  styles: PropTypes.object
}

export default NotTypist
