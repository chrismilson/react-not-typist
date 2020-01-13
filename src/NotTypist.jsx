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

    this.fromSpace = props.from === ' '
    this.toSpace = props.to === ' '

    this.state.from = this.fromSpace ? 't' : props.from
    this.state.to = this.toSpace ? 't' : props.to

    this.from = React.createRef()
    this.to = React.createRef()
  }

  componentDidMount () {
    var fromWidth = this.from.current.offsetWidth
    var toWidth = this.to.current.offsetWidth

    this.setState({ fromWidth, toWidth })
    this.calculated = true
  }

  render () {
    const { fromWidth, toWidth, from, to } = this.state

    return (
      <span
        className='Changer'
        style={this.calculated && {
          '--from-width': fromWidth + 'px',
          '--to-width': toWidth + 'px',
          animationDelay: fromWidth < toWidth ? '0s' : '2s'
        }}
        aria-hidden
      >
        <span
          className={'from' + (this.fromSpace ? ' space' : '')}
          ref={this.from}
        >{ from }</span>
        <span
          className={'to' + (this.toSpace ? ' space' : '')}
          ref={this.to}
        >{ to }</span>
      </span>
    )
  }
}

class NotTypist extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      display: []
    }
    this.key = 0
    this.cur = 0 // the index of the current word
  }

  componentDidMount () { this.next() }

  componentWillUnmount () { clearInterval(this.timeout) }

  next () {
    if (this.props.words.length < 1) return
    const next = (this.cur + 1) % this.props.words.length

    const a = this.props.words[this.cur]
    const b = this.props.words[next]

    this.cur = next
    this.setState({ display: edit(a, b) })

    this.timeout = setTimeout(() => this.next(), 4000)
  }

  render () {
    return (
      <span className='NotTypist' aria-label={this.props.words[this.cur]}>
        {this.state.display.map(c => (
          <Changer key={this.key++} from={c.orig} to={c.next} />
        ))}
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
