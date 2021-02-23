import { Router } from "express"
import controllers from "./item.controllers"

const router = Router()

router
  .route("/")
  .get(controllers.getMany)
  .post(controllers.createOne)
router
  .route("/:id")
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne)

/*
- GET / Read Many
- GET /:id Read One
- POST / Create One
- PUT /:id Update One
- DELETE /:id Remove One
*/

export default router
