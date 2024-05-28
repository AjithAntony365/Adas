import axios from 'axios';

export async function GET() {
    const res = await fetch(`${process.env.Backend_SERVER_URL}/register_driver_data`, {cache: 'no-store'})
    const data = await res.json()
    return Response.json(data)
}
export async function POST(req, res) {

    try {
        const formData = await req.formData()
        const response = await axios.post(`${process.env.Backend_SERVER_URL}/register`, formData);
        return Response.json(response.data);

    } catch (error) {
        // Handle any errors
        console.error('Error submitting form data:', error);
        return Response.json({ error: 'An error occurred while submitting form data' });

    }

}
