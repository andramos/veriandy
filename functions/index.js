/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const {initializeApp} = require("firebase-admin/app");
const {getDatabase} = require("firebase-admin/database");
const cors = require('cors')({ origin: 'https://veriandy.es' });

initializeApp({
    databaseURL: 'https://veriandy-default-rtdb.europe-west1.firebasedatabase.app/'
});

exports.saveFormData = onRequest({ region: "europe-west1" }, async (request, response) => {
    cors(request, response, async () => {
        try {
            const formData = request.body;
            const db = getDatabase();
            const ref = db.ref('formData');

            const newEntryRef = ref.push();
            await newEntryRef.set(formData);

            response.status(200).send({ result: `Data submitted successfully with ID: ${newEntryRef.key}` });

        } catch (error) {
            console.error("Error writing to Realtime Database:", error);
            response.status(500).send({ error: "Failed to submit data. See function logs." });
        }
    });
});