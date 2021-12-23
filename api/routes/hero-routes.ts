import * as express from "express";
import * as controller from "../controllers/hero-controller";

const router = express.Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);

router.post("/", controller.create);

router.patch("/:id", controller.edit);

router.delete("/:id", controller.deleteOne);

export default router;
