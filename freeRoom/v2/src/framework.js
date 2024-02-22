import { dom, frag } from './jsx'

const init = ($el, fn) => {
  let prevTree = {$el, elem: $el.nodeName.toLowerCase()}, tmp

  const render = () => {
    tmp = El(prevTree, fn(), $el)
    deleteRec(prevTree)
    prevTree = tmp
  }

  const deleteRec = (oldTree) => {
    (oldTree.children??[]).map(deleteRec)
    if (!oldTree.repaint) {
      oldTree.$el.remove()
      oldTree = null
    }
  }

  const El = (prev, cur, root) => {
    if (Array.isArray(cur)) cur = { children: cur }
    if (typeof cur === 'string') cur = { innerText: cur }

    cur.elem = cur.elem || 'span'

    if (!prev || (tmp = prev.elem !== cur.elem)) {
      if (prev && tmp) deleteRec(prev)
      cur.$el = document.createElement(cur.elem)
      root.append(cur.$el)
    } else {
      prev.repaint = true
      cur.$el = prev.$el
      cur.cleanup = prev.cleanup
    }

    let {
      $el, elem, children, cleanup, ...rest
    } = cur

    if (cleanup) for (let key in cleanup) {
      $el.removeEventListener(key.substring(2), cur.cleanup[key])
    }

    cur.cleanup = {}

    for (let key in rest) {
      if (typeof (tmp = rest[key]) == 'undefined')
        continue

      if (key.indexOf('on') != 0) {
        $el[key] = tmp
      } else {
        $el.addEventListener(
          key.substring(2),
          cur.cleanup[key] = e => {
            rest[key](e)
            render()
          }
        )
      }
    }

    if (children)
      return {
        ...cur,
        children: children.map((child, i) => El(
          prev && prev.children && prev.children[i],
          child,
          $el
        ))
      }

    return cur
  }

  render()

  return render
}

export default { dom, frag, init }
