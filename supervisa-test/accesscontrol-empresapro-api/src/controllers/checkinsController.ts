import { Request, Response } from 'express';
import { db } from '../db/firebase';
import { CheckIn } from '../models/checkins';
import { Timestamp } from '@google-cloud/firestore';

export const getAllCheckIns = (req: Request, res: Response) => {
  db.collection('checkins').orderBy('checkIn', 'desc').get()
    .then(snapshot => {
      let groupedCheckIns: {[key: string]: CheckIn[]} = {};
      snapshot.forEach(doc => {
        let checkIn = doc.data() as CheckIn;
        if (!checkIn || !checkIn.checkIn) {
          console.error(`Falta la propiedad 'checkIn' en el documento con id: ${doc.id}`);
          return;
        }
        checkIn.employeeId = doc.id;
        if (checkIn.checkIn instanceof Timestamp) {
          checkIn.checkIn = checkIn.checkIn.toDate();
        }
        let checkInDate = checkIn.checkIn.toISOString().split('T')[0];
        if (!groupedCheckIns[checkInDate]) {
          groupedCheckIns[checkInDate] = [];
        }
        groupedCheckIns[checkInDate].push(checkIn);
      });
      let groupedCheckInsArray = Object.keys(groupedCheckIns).map(date => {
        return {date: date, checkIns: groupedCheckIns[date]};
      }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      res.json(groupedCheckInsArray);
    })
    .catch(err => {
      console.error('Error al recuperar los registro:', err);
      res.status(500).json(err)
    });
};
