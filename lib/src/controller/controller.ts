import { ErrorResult } from '@esliph/common'
import { Request, RequestModel } from '../handler/request'
import { Method, RouterModelArgs } from '../model'
import { Router } from '../router/router'
import { EventRouter } from './event-router'
import { ServerRepository } from './repository'

export class ServerController {
    protected static readonly repository = new ServerRepository({ isolated: true })

    createRouter({ handlers, method, name, access, context, module }: RouterModelArgs) {
        if (this.findRouter({ name, access, method })) {
            throw new ErrorResult({ title: 'HTTP Server', message: `Already exists router ${method} "${name}"` })
        }

        this.repository.create({ data: { handlers, method, name, access, context, module } })
    }

    async performRouter<Body = any, Res = any>({ method, name, body, headers, params, access, context, module, origin }: Omit<RequestModel, 'dateTime'>) {
        const router = this.findRouter({ name, access, method })

        const request = new Request({ body, method, name, headers, params, access, context, module, origin })

        const eventRouter = new EventRouter<Body, Res>(request, router?.handlers || ([] as any), !!router)

        await eventRouter.perform()

        return eventRouter.response.getResponse()
    }

    protected findRouter({ name, access, method }: { name: string, access: string, method: string }) {
        const router = this.repository.findFirst({ where: { name: { equals: name }, access: { equals: access }, method: { equals: method } } })

        if (!router) {
            return null
        }

        return new Router(router)
    }

    protected get repository() {
        return ServerController.repository
    }
}
