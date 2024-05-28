import axios from "axios";

export async function POST(req, res) {
    try {
        const body = await req.json();
        console.log('req', body);
        const response = await axios.post(`${process.env.Backend_SERVER_URL}/user_register`, body)
        console.log('response', response.data);
        if (response.status >= 400) {
            return Response.json({
                error: 'There was an error'
            });
        }

        return Response.json({ status: 'ok' });
    } catch (error) {
        return Response.json({
            error: 'There was an error'
        });
    }
}
// export async function POST() {
//     const res = await fetch('https://data.mongodb-api.com/...', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'API-Key': process.env.DATA_API_KEY,
//       },
//       body: JSON.stringify({ time: new Date().toISOString() }),
//     })

//     const data = await res.json()

//     return Response.json(data)
//   }

//   import base64 from 'base-64'

// export async function POST(req, res) {
//     console.log('req', req);
//     try {
//         const response = await fetch(
//             `${process.env.Backend_SERVER_URL}/user_register`,
//             {
//                 body: "We are working on this issue. Will keep you posted.",
//                 //   headers: {
//                 //     'Authorization': 'Basic ' + base64.encode("APIKEY:X"),
//                 //     'Content-Type': 'application/json',
//                 //   },
//                 method: 'POST'
//             }
//         );

//         if (response.status >= 400) {
//             return res.status(400).json({
//                 error: 'There was an error'
//             });
//         }

//         return res.status(200).json({ status: 'ok' });
//     } catch (error) {
//         return res.status(500).json({
//             error: 'There was an error'
//         });
//     }
// };