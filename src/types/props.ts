export interface NotTypistProps {
  /** The list of strings to rotate through. */
  readonly words?: string[]
  /** The time taken for the transition between words to complete. */
  readonly speed?: number
  /** The time waited between word transitions. */
  readonly delay?: number
}

export interface ChangerProps {
  /** The current character to display. */
  readonly char: string
}
