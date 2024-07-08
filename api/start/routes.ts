/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { Constructor } from '@adonisjs/core/types/container'
import { LazyImport } from '@adonisjs/core/types/events'
import { GetControllerHandlers, RouteFn } from '@adonisjs/core/types/http'
const UsersController = () => import('#controllers/users_controller')
const MoviesController = () => import('#controllers/movies_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

const makeCrudRoutes = <T extends Constructor<any>>(
  path: string,
  Controller: () => Promise<any>,
  additionalEndpoints?: Record<
    string,
    {
      method: 'get' | 'post' | 'put' | 'patch' | 'delete'
      handler: string | RouteFn | [LazyImport<T> | T, GetControllerHandlers<T>?]
    }
  >
) => {
  router.get(path, [Controller, 'find'])
  router.post(path, [Controller, 'create'])
  router.get(`${path}/:id`, [Controller, 'get'])
  router.put(`${path}/:id`, [Controller, 'update'])
  router.delete(`${path}/:id`, [Controller, 'delete'])

  if (additionalEndpoints) {
    for (const [endpoint, { method, handler }] of Object.entries(additionalEndpoints)) {
      router[method](`${path}${endpoint}`, handler)
    }
  }
}

router.group(() => {
  makeCrudRoutes('users', UsersController)
  makeCrudRoutes('movies', MoviesController)
})
