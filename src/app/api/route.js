import clientPromise from "@/lib/mongodb";

const client = await clientPromise;
const db = client.db("DriversData");

// // Export a named async function for handling GET requests
export const dynamic = "force-dynamic"; // defaults to auto
// export async function GET(request) {
//     const data = await db.collection("users").find({}).toArray();
//     return Response.json(data)
// }

// export async function GET() {
//     const res = await fetch('https://data.mongodb-api.com/...', {
//       headers: {
//         'Content-Type': 'application/json',
//         'API-Key': process.env.DATA_API_KEY,
//       },
//     })
//     const data = await res.json()

//     return Response.json({ data })
//   }

//   export async function GET(request) {
//     const { searchParams } = new URL(request.url)
//     const id = searchParams.get('id')
//     const res = await fetch(`https://data.mongodb-api.com/product/${id}`, {
//       headers: {
//         'Content-Type': 'application/json',
//         'API-Key': process.env.DATA_API_KEY,
//       },
//     })
//     const product = await res.json()

//     return Response.json({ product })
//   }

//   export async function POST() {
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
// // export async function GET(req, res) {
// //     const data = await db.collection("users").find({}).toArray();
// //     return Response.json(data)
// // }

// export const dynamic = "force-dynamic"; // defaults to auto
export async function GET() {
  const rawData = await db
    .collection("test_geo")
    .find({ type1: { $ne: "Alert_data" } })
    .toArray();
  const transformedData = rawData.map((entry) => {
    const time = Object.keys(entry.lat_long_data)[0]; // Extracting the time
    const location = entry.lat_long_data[time].split(",").map(parseFloat); // Extracting and parsing the location
    const device_id = entry.device_id; // Extracting the device_id

    return { time, location, device_id };
  });
  // Assuming your array is named 'arrayOfObjects'
  let lastItem = transformedData[transformedData.length - 1];

  return Response.json(lastItem);
}
// export async function GET() {
//     const res = await fetch(`${process.env.Backend_SERVER_URL}/driver/Suman`, {
//         cache: 'no-store'
//     })
//     const data = await res.json()

//     return Response.json(
//         {
//             // data: "Hello"
//             // 'alert_details': data.driver_alert_details,
//             // 'filtered': filteredvideo,
//             // "driverNames": driverNames
//             'safety_details': data.driver_safety_score[0],
//             // "driver_img": filtered[0].image_path,

//         }
//     )
// }
