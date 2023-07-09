"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCheckIns = void 0;
const firebase_1 = require("../db/firebase");
const getAllCheckIns = (req, res) => {
    firebase_1.db.collection('checkins').orderBy('timestamp', 'desc').get()
        .then(snapshot => {
        let checkIns = [];
        snapshot.forEach(doc => {
            console.log("Doc", doc);
            const checkIn = doc.data();
            checkIn.employeeId = doc.id;
            checkIns.push(checkIn);
        });
        res.json(checkIns);
    })
        .catch(err => res.status(500).json(err));
};
exports.getAllCheckIns = getAllCheckIns;
