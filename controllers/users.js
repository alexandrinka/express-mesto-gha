import User from '../models/User.js'

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({})
    res.status(200).send(users)
  } catch {
    res.status(500).send({ message: 'Ошибка на сервере' })
  }
}

export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId)
    if (!user) throw new Error("not found");
    res.status(200).send(user);
  }
  catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Невалидные данные', ...err })
    } else if (err.message === 'not found') {
      res.status(404).send({ message: 'Запрашиваемый пользователь не найден' })
    }
    else {
      res.status(500).send({ message: 'Ошибка на сервере' })
    }
  }
}

export const createUser = async (req, res) => {
  try {
    const newUser = await new User(req.body)
    res.status(200).send(await newUser.save())
  }
  catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Невалидные данные', ...err })
    }
    else {
      res.status(500).send({ message: 'Ошибка на сервере' })
    }
  }
}

export const updateProfileUser = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findByIdAndUpdate(_id, req.body, {new: true});
    if (!user) throw new Error("not found");
    res.status(200).send(user);
  }
  catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Невалидные данные', ...err })
    } else if (err.message === 'not found') {
      res.status(404).send({ message: 'Запрашиваемый пользователь не найден' })
    }
    else {
      res.status(500).send({ message: 'Ошибка на сервере' })
    }
  }
}

export const updateAvatarUser = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findByIdAndUpdate(_id, req.body, {new: true})
    if (!user) throw new Error("not found");
    res.status(200).send(user);
  }
  catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Невалидные данные', ...err })
    } else if (err.message === 'not found') {
      res.status(404).send({ message: 'Запрашиваемый пользователь не найден' })
    }
    else {
      res.status(500).send({ message: 'Ошибка на сервере' })
    }
  }
}