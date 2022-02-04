class Group {
  constructor(set, operation) {
    if (typeof set === 'function') {
      this.setFunction = set
    } else {
      this.set = set
    }
    this.operation = operation
  }


  el(item) {
    return new GroupElement(this, item)
  }
}

class GroupElement {
  constructor(Group, elem) {
    this.Group = Group
    this.elem = elem
    if (Group.setFunction) {
      if (!Group.setFunction(elem))
        throw new Error('this element does not fit in the Group')
    }
  }
  
  add(another) {
    const add = this.Group.operation
    const { Group, elem } = this
    return new GroupElement(Group, add(elem,another.elem))
  }

  mult(another) {
    const add = this.Group.operation
    const { Group, elem } = this
    return new GroupElement(Group, add(elem,another.elem))
  }
}


const Z_5 = new Group(
  e => {
    for (let i = 0; i < 5; i++) {
      if (e === i) return true
    }
    return false
  },
  (a, b) => {
    return (a + b) % 5
  },
)

const x = Z_5.el(3)

const y = Z_5.el(3)

console.log(x.add(y))

const Z_5_mult = new Group(
  e => {
    for (let i = 1; i < 5; i++) {
      if (e === i) return true
    }
    return false
  },
  (a, b) => {
    return (a * b) % 5
  },
)

const x1 = Z_5_mult.el(3)

const y1 = Z_5_mult.el(3)

console.log(x1.mult(y1))

// const z = Z_5.el(5)
// Error
