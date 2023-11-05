import { Server, Client, EventsRouter, Get, Request, Response } from '..'

type EventsPublic = {
    'GET': {
        'hello': {
            body: { hello: string }
            response: { world: string }
        }
    }
    'POST': {
        'world': {
            body: { world: string }
            response: { hello: string }
        }
    }
    'PUT': {}
    'PATCH': {}
    'DELETE': {}
    'HEAD': {}
    'OPTIONS': {}
}
type EventsPrivate = {
    'POST': {
        'world': {
            body: { world: string }
            response: { hello: string }
        }
    }
    'PUT': {}
    'PATCH': {}
    'DELETE': {}
    'HEAD': {}
    'OPTIONS': {}
}

Server.on<EventsRouter, 'request/end'>('request/end', arg => {
    console.log(arg)
}, 'Teste')

async function App() {
    const server = new Server<EventsPublic>({ access: 'Teste' })
    const client = new Client<EventsPublic>({ access: 'Teste' })

    class MyClass {

        @Get('hello', { access: 'Teste' })
        perform({ body }: Request, res: Response) {
            res.send({ world: body.hello })
        }
    }

    // server.get('hello', ({ body }, res) => {
    //     res.send({ world: body.hello })
    // })

    const response = await client.get('hello', { hello: 'test' }, { access: 'Teste' })
}

App()
