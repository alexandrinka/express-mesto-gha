import jwt from 'jsonwebtoken';

const { JsonWebTokenError } = jwt;

const checkAuthentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) throw new Error('not authorized');

    const token = authorization.split(' ')[1];
    const parsedToken = await jwt.verify(token, '!q8AcиПььaqЙ');

    if (parsedToken) {
      req.user = {
        _id: parsedToken._id,
      };
      next();
    }
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      res.status(401).send({ message: 'Не авторизован' });
    } else if (err.message === 'not authorized') {
      res.status(401).send({ message: 'Не авторизован' });
    } else {
      res.status(500).send({ message: 'Ошибка на сервере' });
    }
  }
};

export default checkAuthentication;
