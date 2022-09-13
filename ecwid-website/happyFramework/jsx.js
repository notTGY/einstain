const frag = Symbol()
function dom(elem, props, ...children) {
  if (elem === frag) return children
  if (typeof elem === 'function') return elem({...props, children})
  return { ...props, elem, children }
}

export { frag, dom }
