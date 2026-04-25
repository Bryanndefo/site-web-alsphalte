import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const data = await request.json();

        const { data: emailData, error } = await resend.emails.send({
            from: "Atlas Entretien <onboarding@resend.dev>",
            to: ["ndefobryan2005@gmail.com"],
            subject: "Nouvelle demande client - Atlas Entretien",
            html: `
        <h2>Nouvelle demande client</h2>
        <p><strong>Nom:</strong> ${data.nom}</p>
        <p><strong>Téléphone:</strong> ${data.telephone}</p>
        <p><strong>Adresse:</strong> ${data.adresse}</p>
        <p><strong>Type de travaux:</strong> ${data.typeTravaux}</p>
        <p><strong>Description:</strong></p>
        <p>${data.description}</p>
      `,
        });

        if (error) {
            console.error("Erreur Resend:", error);
            return Response.json({ success: false, error }, { status: 500 });
        }

        console.log("Email envoyé:", emailData);

        return Response.json({ success: true, emailData });
    } catch (error) {
        console.error("Erreur API:", error);
        return Response.json({ success: false }, { status: 500 });
    }
}