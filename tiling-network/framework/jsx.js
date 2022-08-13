const frag = 'frag'
function dom(elem, props, ...children) {
  if (elem === frag) return children
  if (typeof elem === 'function') return elem({...props, children})
  let text = ''
  if (
    typeof children !== 'undefined'
    && typeof children[0] === 'string'
  ) text = children.shift()
  return { ...props, elem, text, children }
}

export { frag, dom }
