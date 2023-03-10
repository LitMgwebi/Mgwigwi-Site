//#region Imports and Router initialization
const log = require('../config/logging');
const Concept = require("../Models/Concept")
const { Router } = require("express");
const requireAuth = require("../middleware/requireAuth");
const upload = require("../middleware/upload");
const { uploadToCloudinary, removeFromCloudinary } = require("../services/cloudinary");

const router = Router();
//#endregion


//#region GET

//#region GET AlL
router.get("/", async (req, res) => {
    let concept = null;

    try {
        concept = await Concept.find({});
        res.status(201).send({
            concept: concept,
            error: null,
            message: "Concept retrieved successfully"
        });
    } catch (error) {
        log.error(error.message);
        res.status(400).send({
            concept: concept,
            error: error.message,
            message: "Concept retrieval failed"
        });
    }
});
//#endregion

//#region GET 1
router.get("/:id", async (req, res) => {
    let concept = null;
    try {
        concept = await Concept.findById(req.params.id);

        res.status(201).send({
            concept: concept,
            error: null,
            message: "Concept piece retrieval successful"
        });
    } catch (error) {
        log.error(error.message)
        res.status(400).send({
            concept: concept,
            error: error.message,
            message: "Concept piece retrieval failed"
        });
    }
})
//#endregion

//#endregion

//#region POST
router.post('/add', upload.array("photos"), requireAuth, async (req, res) => {
    let concept = null;
    let data;
    const photos = []
    const public_ids = []
    try {
        const files = req.files;
        for (const file of files) {
            const { path } = file;
            data = await uploadToCloudinary(path, "concept");

            const { url, public_id } = data;
            photos.push(url);
            public_ids.push(public_id);
        }

        concept = new Concept({
            title: req.body.title,
            description: req.body.description,
            photos: photos,
            public_ids: public_ids,
            user_id: req.user._id
        });

        await concept.save();
        res.status(201).send({
            concept: concept,
            error: null,
            message: "New concept piece was successfully added"
        });
    } catch (error) {
        log.error(error);
        res.status(400).send({
            concept: concept,
            error: error.message,
            message: "Could not add new concept piece"
        });
    }
});
//#endregion

//#region DELETE /fine-art/:id
router.delete('/:id', requireAuth, async (req, res) => {
    let concept = null
    try {
        concept = await Concept.findById(req.params.id);
        for (let i = 0; i < concept.public_ids.length; i++) {
            const publicId = concept.public_ids[i];
            await removeFromCloudinary(publicId);
        }

        await concept.remove();
        res.status(201).send({
            error: null,
            message: "Concept piece deleted successfully",
        })
    } catch (error) {
        log.error(error.message)
        res.status(400).send({
            concept: concept,
            error: error.message,
            message: "Could not delete concept piece"
        });
    }
});
//#endregion
module.exports = router;