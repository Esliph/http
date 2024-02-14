import { HandlerRouter, Method, RouterModel } from '../model'

export class Router<Name extends string, Body = any> implements RouterModel<Name, Body> {
    name: Name
    handlers: HandlerRouter<Name, Body>[]
    method: Method
    module: string
    context: string
    access: string
    attributes: { [x: string]: any; }

    constructor({ handlers, method, name, access, context, module, attributes }: RouterModel<Name, Body>) {
        this.handlers = handlers
        this.method = method
        this.name = name
        this.access = access
        this.context = context
        this.attributes = attributes
        this.module = module
    }
}
