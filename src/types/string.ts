/**
 * A string can be though of as an array of characters. An editable string is
 * just that except each character has an associated key with it.
 *
 * This key reveals any edits that may have happened between strings. It can be
 * shown that [m 0, o 1, o 2] -> [b 0, o 1, o2] was just a replacement of m with
 * b. But [m 0, o 1, o 2] -> [b 3, o 1, o2] is a removal of m and addition of b,
 * shown by the dissappearance of key 0 and appearance of key 3.
 */
export type EditableString = {
  key: number
  char: string
}[]
