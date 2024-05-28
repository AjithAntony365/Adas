export async function GET(request, { params }) {
    const userName = params.userName
    const res = await fetch(`${process.env.Backend_SERVER_URL}/user_profile/${userName}`)
    const data = await res.json()
    return Response.json(data)
    // return Response.json("Working")
}
export async function PUT(request) {

}
export async function DELETE(request) {

}