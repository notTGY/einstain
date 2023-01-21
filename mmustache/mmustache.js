V = /\{\{([^(\}\})]*)\}\}/
C = /\{\{#([^(\}\})]*)\}\}((?:(?!\{\{\/\1\}\})(.|\n))*)\{\{\/\1\}\}/

const r = (T, D) => {
  while(T.match(V)) {

    while (T != (p = T.replace(C, (_, k, t) =>
      (Array.isArray(v = D[k.substring(0)]) ? v : [v])
        .map(v => r(t, typeof v == 'object' ? {...D, ...v} : {...D, '.': v}))
        .join('')
    ))) T = p

    T = T.replace(V, (_, k) => r(D[k], D))
  }

  return T
}
module.exports = { render: r }
