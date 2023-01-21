const mmustache = require('./mmustache.min')
const res = mmustache.render(
  `List of users:
  {{#users}}
  * {{User}}
  {{/users}}
  `,
  {
    users: [
      {name: 'Alice'},
      {name: 'Bob'},
      {name: 'Charlie'},
      {name: '<ul>injection</ul>'},
    ],
    User: `{{#name}}{{Strong}}{{/name}}`,
    Strong: `<b>{{.}}</b>`
  },
)
console.log(res)
