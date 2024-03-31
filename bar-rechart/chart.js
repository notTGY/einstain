const labelize = (n) => {
  const k = Math.floor(n / 1_000)
  const m = Math.floor(n / 1_000_000)
  if (n >= 10_000_000) {
    return `${m}m`
  }
  if (n >= 10_000) {
    return `${k}k`
  }
  return `${n}`
}

const C = (elem, data) => {
  const n = 5
  let max = data.reduce((a, i) => Math.max(a, i[1]), 0)
  max =
    Math.exp(
      Math.floor(Math.log10(max)) * Math.LN10
    ) * Math.ceil(
    max / Math.exp(
      Math.floor(Math.log10(max)) * Math.LN10
      )
    )
  const step = max / (n - 1)
  const labels = Array.from({length: n}, (_, i) => labelize(Math.floor(i * step)))

  const container = document.createElement('div')
  container.className = 'container'

  const axisY = document.createElement('div')
  axisY.className = 'axis-y'
  labels.reverse().forEach(l => {
    const lab = document.createElement('span')
    lab.innerText = l
    axisY.append(lab)
  })

  const axisX = document.createElement('div')
  axisX.className = 'axis-x'
  data.forEach(d => {
    const lab = document.createElement('span')
    lab.style.textAlign = 'center'
    lab.style.width = '100%'
    lab.innerText = d[0]
    axisX.append(lab)
  })

  const area = document.createElement('div')
  area.className = 'area'
  data.forEach(d => {
    const h = 100 * d[1] / max
    const bar = document.createElement('div')
    bar.style.height = `${h}%`
    bar.className = 'bar'
    bar.style.width =
      `calc(${100 / data.length}% - 1.6%)`
    area.append(bar)
  })
  
  container.append(axisY)
  container.append(area)
  container.append(axisX)
  elem.append(container)
}
