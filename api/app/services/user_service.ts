import User from '#models/user'

export default class UserService {
  async find({ $page = 1, $limit = 25, ...params }: { [key: string]: any }) {
    return User.filter(params).paginate(Number($page), Number($limit))
  }

  async create(payload: any) {
    return User.create(payload)
  }

  async get(id: string) {
    return User.findOrFail(id)
  }

  async update(id: number, payload: any) {
    const user = await User.findOrFail(id)
    user.merge(payload)
    await user.save()
    return user
  }

  async delete(id: number) {
    const user = await User.findOrFail(id)
    await user.delete()
    return user
  }
}
