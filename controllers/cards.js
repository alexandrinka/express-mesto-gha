import Card from '../models/Card';

export const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.status(200).send(cards);
  } catch (err) {
    res.status(500).send({ message: 'Ошибка на сервере' });
  }
};

export const deleteCardById = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndRemove(cardId);
    if (!card) throw new Error('not found');
    res.status(200).send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Невалидные данные', ...err });
    } else if (err.message === 'not found') {
      res.status(404).send({ message: 'Запрашиваемая карточка не найдена' });
    } else {
      res.status(500).send({ message: 'Ошибка на сервере' });
    }
  }
};

export const createCard = async (req, res) => {
  try {
    req.body.owner = req.user._id;
    const newCard = await Card.create(req.body);
    res.status(201).send(await newCard.save());
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Невалидные данные', ...err });
    } else {
      res.status(500).send({ message: 'Ошибка на сервере' });
    }
  }
};

export const likeCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const newCard = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!newCard) throw new Error('not found');
    res.status(200).send(await newCard.save());
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Невалидные данные', ...err });
    } else if (err.message === 'not found') {
      res.status(404).send({ message: 'Запрашиваемая карточка не найдена' });
    } else {
      res.status(500).send({ message: 'Ошибка на сервере' });
    }
  }
};

export const dislikeCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const newCard = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true },
    );
    if (!newCard) throw new Error('not found');
    res.status(200).send(await newCard.save());
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Невалидные данные', ...err });
    } else if (err.message === 'not found') {
      res.status(404).send({ message: 'Запрашиваемая карточка не найдена' });
    } else {
      res.status(500).send({ message: 'Ошибка на сервере' });
    }
  }
};
