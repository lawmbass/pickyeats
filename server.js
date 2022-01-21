import { createServer, Model } from 'miragejs'

export function makeServer({ environment = 'test' }) {
  return createServer({
    environment,

    models: {
      user: Model,
      suggestion: Model,
    },

    routes() {
      this.namespace = 'api/v1'

      this.get('/users', (schema, request) => {
        return schema.users.all()
      })

      this.get('/users/:email', (schema, request) => {
        let email = request.params.email

        return schema.users.findBy({ email })
      })

      this.get('/suggestions', (schema, request) => {
        return schema.suggestions.all()
      })

      this.get('/suggestions/:id', (schema, request) => {
        let id = request.params.id

        return schema.suggestions.find(id)
      })

      this.post('/suggestions', (schema, request) => {
        let attrs = JSON.parse(request.requestBody)

        return schema.suggestions.create(attrs)
      })

      this.patch('/suggestions/:id', (schema, request) => {
        let newAttrs = JSON.parse(request.requestBody)
        let id = request.params.id
        let suggestion = schema.suggestions.find(id)

        return suggestion.update(newAttrs)
      })

      this.delete('/suggestions/:id', (schema, request) => {
        let id = request.params.id

        return schema.suggestions.find(id).destroy()
      })

      this.namespace = '' // reset namespace to the root
      this.passthrough() // pass through everything not handled to the current domain (e.g. localhost:3000)
    },
    seeds(server) {
      server.create('user', { name: 'User1', email: 'user1@email.com', admin: true })
      server.create('user', { name: 'User2', email: 'user2@email.com', admin: false })

      server.create('suggestion', {
        name: 'Panda Express',
        address: "429 L'Enfant Plaza SW, Washington, DC 20024",
        link: 'https://pandaexpress.com',
        tags: ['Fast Food', 'Chinese'],
        ratings: {
          price: 4,
          service: 4,
        },
      })
      server.create('suggestion', {
        name: 'Apple Bees',
        address: '6310 Richmond Hwy, Alexandria, VA 22306',
        link: 'https://applebees.com',
        tags: ['American'],
        ratings: {
          price: 4,
          service: 2,
        },
      })
      server.create('suggestion', {
        name: 'Chick-Fil-A',
        address: '710 12th St S Suite 109, Arlington, VA 22202',
        link: 'https://chick-fil-a.com',
        tags: ['Fast Food', 'Chicken'],
        ratings: {
          price: 5,
          service: 5,
        },
      })
    },
  })
}
