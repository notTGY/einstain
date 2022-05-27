const happyFramework = (root, fn) => {
  let prevJson = []

  const render = () => {
    const json = fn()

    // @dev
    if (!Array.isArray(json))
      return console.error(
        'jstf expects an Array as a vdom'
      )

    root.innerHTML = ''

    root.append(El(prevJson, json))

    prevJson = json
  }


  const El = (prev, cur) => {
    if (Array.isArray(cur)) cur = { children: cur }
    if (typeof cur === 'string') cur = { text: cur }

    cur.elem = cur.elem || 'div'

    if (!prev || prev.elem !== cur.elem)
      cur.$el = document.createElement(cur.elem)
    else {
      cur.$el = prev.$el
      cur.cleanup = prev.cleanup
    }

    const { $el, elem, text, value, className, children, ...handlers } = cur

    const i = e => typeof e !== 'undefined'
    if (i(text)) $el.innerText = text
    if (i(value)) $el.value = value
    if (i(className)) $el.className = className

    if (children)
      $el.append(...children.map((child, i) =>
        El(
          prev && prev.children && prev.children[i],
          child
        )
      ))

    if (cur.cleanup) for (const k in cur.cleanup)
      $el.removeEventListener(k, cur.cleanup[k])

    cur.cleanup = {}

    for (const key in handlers)
      $el.addEventListener(
        key,
        cur.cleanup[key] = e => {
          handlers[key](e)
          render()
        }
      )

    return $el
  }

  render()

  return render
}
export default happyFramework
