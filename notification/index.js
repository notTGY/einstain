const emails = [
'anna.smith@gmail.com',
'jack.sparrow@yahoo.co.uk',
'sophia.torres@hotmail.com',
'ethan.hunt@aol.com',
'emma.watson@outlook.com',
'liam.neeson@gmail.com',
'catherine.zeta@yahoo.com',
'george.clooney@aol.com',
'julia.roberts@hotmail.com',
'brad.pitt@gmail.com',
'angelina.jolie@yahoo.com',
'jennifer.lawrence@outlook.com',
'chris.evans@aol.com',
'robert.downey@gmail.com',
'gwyneth.paltrow@yahoo.com',
'ben.stiller@hotmail.com',
'reese.witherspoon@aol.com',
'mark.wahlberg@gmail.com',
'charlize.theron@yahoo.com',
'will.ferrell@hotmail.com',
'matt.damon@gmail.com',
'sandra.bullock@yahoo.com',
'leonardo.dicaprio@aol.com',
'kate.winslet@hotmail.com',
'denzel.washington@gmail.com',
'meryl.streep@yahoo.com',
'hugh.jackman@aol.com',
'nicole.kidman@hotmail.com',
'steve.jobs@gmail.com',
'oprah.winfrey@yahoo.com',
'martin.scorsese@aol.com',
'alec.baldwin@hotmail.com',
'lady.gaga@gmail.com',
'justin.bieber@yahoo.com',
'taylor.swift@aol.com',
'beyonce.knowles@hotmail.com',
'jay.z@gmail.com',
'madonna. Ciccone@yahoo.com',
'kanye.west@aol.com',
'kim.kardashian@hotmail.com',
'drake.bell@gmail.com',
'britney.spears@yahoo.com',
'justin.timberlake@aol.com',
'pink.singer@hotmail.com',
'adele.adkins@gmail.com',
'ed.sheeran@yahoo.com',
'sam.smith@aol.com',
'taylor.lautner@hotmail.com',
'lana.del.rey@gmail.com',
'pharrell.williams@yahoo.com',
]

const but = document.getElementById('but')
let shouldNotify = false
const notify = () => {
  const img = "https://images.ctfassets.net/fzn2n1nzq965/2EOOpI2mMZgHYBlbO44zWV/5a6c5d37402652c80567ec942c733a43/favicon.png?w=180&h=180";
  const number = Math.ceil(Math.random()*9) * 50
  const email = emails[Math.floor(emails.length * Math.random())]
  const text = `You received payment of $${(number-1).toFixed(2)} from ${email}`;
  const notification = new Notification("Stripe", { body: text, icon: img });
}

const startNotifications = () => {
  if (!shouldNotify) return

  notify()
  setTimeout(() => {
    startNotifications()
  }, Math.random() * 60 * 1000)
}

const onclick = () => {
  shouldNotify = !shouldNotify

  if (shouldNotify) {
    Notification.requestPermission().then((result) => {
        console.log(result)
        if (result === 'granted') {
          startNotifications()
        }
    })
  }
}

but.addEventListener('click', onclick)
