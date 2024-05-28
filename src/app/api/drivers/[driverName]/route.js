export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request, { params }) {
    const driverName = params.driverName
    const res = await fetch(`${process.env.Backend_SERVER_URL}/driver/${driverName}`, {
        // next: { revalidate: 5 },// Revalidate every 10 seconds 
        // cache: 'no-store'
    })
    const data = await res.json()
    const res2 = await fetch(`${process.env.Backend_SERVER_URL}/register_driver_data`,
        // { cache: 'no-store' }
    )
    const data2 = await res2.json()
    const filtered = data2.register_driver_data.filter((item) => item.driver_name == driverName);
    const sortedData = data.driver_alert_details.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    const filteredvideo = sortedData.filter(item => item.VideoReferences);
    const filteredimage = sortedData.filter(item => item.imageReferences);

    return Response.json(
        {
            'alert_details': data.driver_alert_details,
            'safety_details': data.driver_safety_score[0],
            "driver_img": filtered[0].image_path,
            "filteredvideo": filteredvideo,
            "filteredimage": filteredimage
        }
    )
}