export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request) {
  const res = await fetch(`${process.env.Backend_SERVER_URL}/get_all_driver_details`, {
    //  cache: 'no-store' ,
     next: { revalidate: 60 }, // Revalidate every 60 seconds
    });
  const data = await res.json();
  return Response.json(data);
}