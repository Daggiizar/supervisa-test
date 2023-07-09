import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
import { error } from 'console';

const cors = Cors({
  methods: ['GET', 'PUT'],
});

const apiUrl = 'http://localhost:3000/api/employees';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  cors(req, res, error);

  try {
    const { id } = req.query;

    if (req.method === 'GET') {
      if (id) {
        const response = await axios.get(`${apiUrl}/${id}`);
        return res.status(200).json(response.data);
      } else {
        const response = await axios.get(apiUrl);
        return res.status(200).json(response.data);
      }
    } else {
      return res.status(405).json({ error: 'Método no permitido' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Error al conectar con el servidor' });
  }
};

export default handler;
