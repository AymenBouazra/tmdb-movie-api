import type { HttpContext } from '@adonisjs/core/http'
import UserService from '#services/user_service'
import { inject } from '@adonisjs/core'

@inject()
export default class UsersController {
  constructor(private userService: UserService) {}

  async find({ request }: HttpContext) {
    return this.userService.find(request.qs())
  }

  async get({ request }: HttpContext) {
    const { id } = request.params()
    return this.userService.find(id)
  }

  async create({ request }: HttpContext) {
    return this.userService.create(request.body())
  }

  async update({ request }: HttpContext) {
    const payload = request.body()
    const { id } = request.params()
    return this.userService.update(id, payload)
  }

  async delete({ request }: HttpContext) {
    const { id } = request.params()
    return this.userService.delete(id)
  }
}
