const burgerElement = document.querySelector('#burger')
const navigation = document.querySelector('#nav-wrapper')
const navLinks = document.querySelectorAll('#nav-wrapper a')

const changeVisibility = (e) => {
  if (e !== undefined)
    navigation.hidden = !!e
  else
    navigation.hidden = !navigation.hidden

  navigation.style.display =
    navigation.hidden ? 'none' : 'flex'
}

burgerElement.addEventListener('click', (e) => {
  changeVisibility()
  e.stopPropagation()
});

burgerElement.addEventListener('unfocused', (e) => {
  changeVisibility(false)
});

navLinks.forEach(child => {
  child.addEventListener('click', (e) => {
    changeVisibility(true)
  });
});


document.body.addEventListener('click', () => {
  changeVisibility(true)
});

