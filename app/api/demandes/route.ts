import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const data = await request.json();

        await resend.emails.send({
            from: "infatlaspro@gmail.com",
            to: "infatlaspro@gmail.com",
            subject: "Nouvelle demande client - Asphalte",
            html: `
        <h2>Nouvelle demande</h2>
        <p><strong>Nom:</strong> ${data.nom}</p>
        <p><strong>Téléphone:</strong> ${data.telephone}</p>
        <p><strong>Adresse:</strong> ${data.adresse}</p>
        <p><strong>Travaux:</strong> ${data.typeTravaux}</p>
        <p><strong>Description:</strong></p>
        <p>${data.description}</p>
      `,
        });

        return Response.json({ success: true });
    } catch (error) {
        console.error(error);
        return Response.json({ success: false }, { status: 500 });
    }
}