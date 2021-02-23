export const getOne = model => async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.user._id

    const doc = await model
      .find({ _id: id, createdBy: userId })
      .exec()
      .lean()

    if (!doc)
      return res
        .status(404)
        .json({ status: "Error", message: `${model} Doesn't exist` })

    return res.status(200).json({ status: "success", data: doc })
  } catch (error) {
    res.status(501).json({ status: "Error", message: error })
  }
}

export const getMany = model => async (req, res) => {
  try {
    const userId = req.user._id

    const doc = await model
      .find({ createdBy: userId })
      .exec()
      .lean()

    if (!doc)
      return res
        .status(404)
        .json({ status: "Error", message: `${model} doesn't exist` })

    return res.status(200).json({ status: "sucess", data: doc })
  } catch (error) {
    res.status(501).json({ status: "Error", message: error })
  }
}

export const createOne = model => async (req, res) => {
  try {
    const doc = await model
      .create({ ...req.body, createdBy: req.user._id })
      .exec()
      .lean()

    res.status(200).json({ status: "success", message: doc })
  } catch (error) {
    res.status(501).json({ status: "Error", message: error })
  }
}

export const updateOne = model => async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.user._id

    const doc = await model
      .findAndUpdate({ _id: id, createdBy: userId }, req.body, { new: true })
      .exec()
      .lean()

    if (!doc)
      return res
        .status(404)
        .json({ status: "Error", message: `${model} doesn't exist` })

    res.status(200).json({ status: "success", data: doc })
  } catch (error) {
    res.status(501).json({ status: "Error", message: error })
  }
}

export const removeOne = model => async (req, res) => {
  try {
    const { id } = req.params

    const doc = await model
      .deleteOne({ _id: id, createdBy: req.user._id })
      .exec()
      .lean()

    if (!doc)
      return res
        .status(404)
        .json({ status: "Error", message: `${model} doesn't exist` })

    res.status(200).json({ status: "success", data: doc })
  } catch (error) {
    res.status(501).json({ status: "Error", message: error })
  }
}

export const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model)
})
