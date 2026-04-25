"use client";

import { useState } from "react";
import "./globals.css";

function App() {

  const [formData, setFormData] = useState({
    nom: "",
    telephone: "",
    adresse: "",
    typeTravaux: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const phoneRegex = /^(\+1\s?)?(\(?[0-9]{3}\)?[\s.-]?)?[0-9]{3}[\s.-]?[0-9]{4}$/;

    if (formData.nom.trim().length < 2) {
      return "Veuillez entrer un nom valide.";
    }

    if (!phoneRegex.test(formData.telephone.trim())) {
      return "Veuillez entrer un numéro de téléphone valide.";
    }

    if (formData.adresse.trim().length < 8) {
      return "Veuillez entrer une adresse plus complète.";
    }

    if (formData.typeTravaux.trim().length < 3) {
      return "Veuillez préciser le type de travaux.";
    }

    if (formData.description.trim().length < 10) {
      return "Veuillez ajouter une description d’au moins 10 caractères.";
    }

    return "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setMessage(validationError);
      return;
    }


    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/demandes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi");
      }

      setMessage("Votre demande a été envoyée avec succès.");

      setFormData({
        nom: "",
        telephone: "",
        adresse: "",
        typeTravaux: "",
        description: "",
      });
    } catch (error) {
      setMessage("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const services = [
    {
      title: "Entretien et réparation d'asphalte résidentiel",
      description:
          "Nous aidons les propriétaires à redonner une belle apparence à leur entrée avec des travaux d'entretien, de réparation et d'amélioration d'asphalte.",
      image:
          '/Entretien en reparation.JPG',
    },
    {
      title: 'Aménagement paysager',
      description:
          'Nettoyage, mise en valeur extérieure et petits travaux de paysagement pour garder votre propriété propre, accueillante et soignée.',
      image:
          '/Amenagement paysager.JPG',
    },
    {
      title: 'Tonte de gazon',
      description:
          "Un entretien essentiel pour protéger votre maison et garder l'extérieur en bon état tout au long de la saison.",
      image:
          '/Debroussage-tonteGazon.JPG',
    },
    {
      title: 'Lavage haute pression',
      description:
          'Des services variés pour aider les propriétaires à redonner vie à leur propriété avec un résultat propre et professionnel.',
      image:
          '/Lavage haute pression.JPG',
    },
    {
      title: 'Nettoyage de gouttières',
      description:
          'Des services variés pour aider les propriétaires à redonner vie à leur propriété avec un résultat propre et professionnel.',
      image:
          '/Vidange de goutières.JPG',
    },
  ]

  const pointsForts = [
    "Entretien et réparation d'asphalte",
    "Tonte de gazon",
    "Aménagement paysager",
    "Lavage haute pression",
    "Nettoyage de gouttières"
  ]

  return (
      <div className="min-h-screen bg-[#111111] text-[#1b1b1b]">
        <header
            className="relative overflow-hidden bg-gradient-to-br from-[#111111] via-[#171717] to-[#1f1a11] text-white">
          <div
              className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.22),transparent_28%),radial-gradient(circle_at_left,rgba(255,255,255,0.08),transparent_20%)]"/>

          {/* ── Top nav bar ── */}
          <div className="relative mx-auto max-w-7xl px-6 pt-7 pb-0 lg:px-8">
            <div
                className="fade-up flex flex-col gap-5 border-b border-white/10 pb-6 lg:flex-row lg:items-center lg:justify-between">

              {/* Logo + wordmark */}
              <div className="flex min-w-0 items-center gap-4 md:gap-5">
                <div
                    className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-2 border-[#d4af37] bg-[#d4af37] shadow-[0_0_32px_rgba(212,175,55,0.35)] float-soft md:h-20 md:w-20">
                  <img
                      src="/logo-compagnie.png"
                      alt="Logo Atlas Entretien"
                      className="h-10 w-10 object-contain md:h-12 md:w-12"
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.38em] text-[#d4af37] md:text-[0.8rem]">
                    Atlas Entretien
                  </p>
                  <p className="mt-1 text-lg font-semibold leading-snug text-white md:text-2xl lg:text-[2rem]">
                    Entretien propre, élégant et professionnel
                  </p>
                </div>
              </div>

              {/* CTA cluster */}
              <div className="hidden shrink-0 items-center gap-3 md:flex">
                <a
                    href="#estime"
                    className="rounded-full bg-[#d4af37] px-6 py-2.5 text-sm font-semibold text-black shadow-[0_4px_20px_rgba(212,175,55,0.4)] transition duration-300 hover:scale-105 hover:shadow-[0_6px_28px_rgba(212,175,55,0.55)]"
                >
                  Obtenir un estimé
                </a>
                <a
                    href="tel:8733763841"
                    className="rounded-full border border-white/20 bg-white/5 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur transition duration-300 hover:scale-105 hover:bg-white/10"
                >
                  Appeler
                </a>
              </div>
            </div>
          </div>

          {/* ── Hero body ── */}

          {/* ── Hero body ── */}
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="py-20 lg:py-28">
              <div className="fade-up-delayed mx-auto max-w-4xl text-center lg:max-w-5xl">
                {/* Mobile CTAs */}
                <div className="mb-8 mt-0 flex w-full items-center justify-center gap-3 md:hidden">
                  <a
                      href="#estime"
                      className="rounded-full bg-[#d4af37] px-6 py-3 text-sm font-semibold text-black"
                  >
                    Obtenir un estimé
                  </a>
                  <a
                      href="tel:8733763841"
                      className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white"
                  >
                    Appeler
                  </a>
                </div>

                <h2 className="mt-7 text-5xl font-bold leading-[1.08] tracking-tight text-white md:text-6xl lg:text-7xl">
                  Redonnez du style et de la valeur à votre propriété.
                </h2>

                <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-zinc-400 md:text-lg">
                  Atlas Entretien est une entreprise d’entretien résidentiel qui œuvre dans la région de Gatineau/Ottawa.
                  Nous offrons un accompagnement et des services dédiés aux propriétaires souhaitant rehausser l’apparence et le prestige de leur demeure.
                  Chez Atlas Entretien, votre vision devient notre mission pour faire de vos rêves une réalité.
                </p>

                {/* Points forts */}
                <div className="mt-10 flex flex-wrap justify-center gap-3">
                  {pointsForts.map((item) => (
                      <p
                          key={item}
                          className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/35 bg-[#d4af37]/10 px-4 py-1.5 text-xs font-medium tracking-wide text-[#f3d77a]"
                      >
                        <span className="h-1 w-1 rounded-full bg-[#d4af37]" />
                        {item}
                      </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="bg-[#f8f5ef]">

          {/* ── À propos ── */}
          <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
            <div className="fade-up grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#b88b16]">
                  À propos
                </p>
                <h2 className="mt-4 text-4xl font-bold leading-tight text-[#1b1b1b] md:text-5xl">
                  Une service fiable et professionnel
                </h2>
                <p className="mt-5 text-base leading-8 text-zinc-600">
                  Nous sommes de jeunes entrepreneurs de la région de Gatineau/Ottawa ayant pour objectif de redonner
                  vie à votre maison.
                  Que votre stationnement soit en train de rendre l’âme, que votre revêtement extérieur soit couvert de
                  saletés, ou que votre cour arrière ressemble plus à une jungle qu’à un terrain gazonné, rien ne nous
                  résiste.
                  Chez Atlas Entretien nous sommes les experts en matière d’entretient résidentiel.
                  Après notre passage chez-vous, vous retrouverez un confort tel que vous ne voudrez plus quitter votre
                  demeure.
                </p>
              </div>
              {/* Decorative accent block */}
              <div className="hidden lg:block">
                <div className="relative overflow-hidden rounded-[2rem] shadow-2xl">
                  <img
                      src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop"
                      alt="Maison moderne avec entrée propre"
                      className="h-[420px] w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"/>
                </div>
              </div>
            </div>
          </section>

          {/* ── Services ── */}
          <section id="services" className="bg-white">
            <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
              <div className="fade-up flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#b88b16]">
                    Services
                  </p>
                  <h2 className="mt-3 text-4xl font-bold text-[#1b1b1b] md:text-5xl">
                    Nos services proposés
                  </h2>
                  <p className="mt-4 max-w-lg text-base text-zinc-500">
                    Nous proposons plusieurs services d’entretien extérieur destinés à maintenir votre propriété propre,
                    fonctionnelle et agréable à regarder.
                  </p>
                </div>
                <a href="#estime"
                   className="mt-4 hidden shrink-0 rounded-full border border-[#d4af37]/50 px-5 py-2.5 text-sm font-semibold text-[#b88b16] transition hover:bg-[#d4af37]/10 sm:inline-flex">
                  Demander un estimé →
                </a>
              </div>

              {/* First 3 — equal grid */}
              <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {services.map((service, index) => (
                    <article
                        key={service.title}
                        className="card-hover fade-up group overflow-hidden rounded-[1.75rem] border border-[#eadfc3] bg-[#fffdf8] shadow-lg"
                        style={{animationDelay: `${index * 0.12}s`}}
                    >
                      <div className="overflow-hidden">
                        <img
                            src={service.image}
                            alt={service.title}
                            className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-[#1b1b1b]">{service.title}</h3>
                        <p className="mt-3 text-sm leading-7 text-zinc-500">{service.description}</p>
                      </div>
                    </article>
                ))}
              </div>
            </div>
          </section>

          {/* ── Coordonnées + Pourquoi ── */}
          <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2">

              {/* Left — why us + contact info */}
              <div className="fade-up">
                <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#b88b16]">
                  Nos coordonnées
                </p>
                <h2 className="mt-3 text-4xl font-bold text-[#1b1b1b] md:text-5xl">
                  Parlez-nous de votre projet
                </h2>
                <p className="mt-4 max-w-xl text-base leading-8 text-zinc-600">
                  Besoin d&#39;aide pour votre entrée, votre terrain, vos gouttières ou l&#39;entretien de
                  votre maison? Contactez Atlas Entretien pour un estimé.
                </p>

                {/* Why-us trio */}
                <div className="mt-10 space-y-4">
                  {[
                    {
                      title: 'Service professionnel',
                      body: "Nous réalisons chaque projet avec soin et professionnalisme afin d’offrir un résultat propre, durable et à la hauteur des attentes de nos clients."
                    },
                    {
                      title: 'Travaux soignés et durables',
                      body: "Nous portons une attention particulière à la qualité du travail afin d’offrir des résultats propres, solides et durables pour votre propriété."
                    },
                    {
                      title: 'Communication simple et rapide',
                      body: 'Vous pouvez nous contacter facilement par téléphone ou par courriel pour discuter de votre projet et obtenir un estimé.'
                    },
                  ].map((item) => (
                      <div key={item.title}
                           className="card-hover flex gap-4 rounded-2xl border border-[#eadfc3] bg-white p-5 shadow-sm">
                        <div
                            className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#d4af37]/15 text-[#b88b16] text-sm font-bold">
                          ✦
                        </div>
                        <div>
                          <h3 className="font-bold text-[#1b1b1b]">{item.title}</h3>
                          <p className="mt-1.5 text-sm leading-6 text-zinc-500">{item.body}</p>
                        </div>
                      </div>
                  ))}
                </div>
              </div>

              {/* Right — contact card */}
              <div className="fade-up-delayed">
                <div className="overflow-hidden rounded-[2rem] border border-[#eadfc3] bg-white shadow-2xl">

                  {/* Dark header band */}
                  <div className="relative overflow-hidden bg-[#111111] px-8 py-8">
                    <div
                        className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.2),transparent_55%)]"/>
                    <p className="relative text-xs uppercase tracking-[0.35em] text-[#d4af37]">Contact</p>
                    <h3 className="relative mt-2 text-2xl font-semibold text-white">Atlas Entretien</h3>
                    <p className="relative mt-2 text-sm text-zinc-400">Gatineau / Ottawa · Résidentiel</p>
                  </div>

                  {/* Info rows */}
                  <div className="divide-y divide-[#eadfc3] text-sm text-zinc-700">
                    <div className="px-8 py-5">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b88b16]">Téléphone</p>
                      <div className="mt-2 flex flex-col gap-1.5">
                        <a href="tel:8733763841"
                           className="font-medium text-[#1b1b1b] transition hover:text-[#b88b16]">873-376-3841</a>
                        <a href="tel:8736600926"
                           className="font-medium text-[#1b1b1b] transition hover:text-[#b88b16]">873-660-0926</a>
                      </div>
                    </div>

                    <div className="px-8 py-5">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b88b16]">Courriel</p>
                      <a href="mailto:infatlaspro@gmail.com"
                         className="mt-2 inline-block font-medium text-[#1b1b1b] transition hover:text-[#b88b16]">
                        infatlaspro@gmail.com
                      </a>
                    </div>

                    <div className="px-8 py-5">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b88b16]">Région desservie</p>
                      <p className="mt-2 font-medium text-[#1b1b1b]">Gatineau / Ottawa</p>
                    </div>

                    <div className="px-8 py-5">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b88b16]">Réseaux sociaux</p>
                      <div className="mt-3 flex gap-3">
                        <a
                            href="https://www.facebook.com/share/14WwZQPxPj9/?mibextid=wwXIfr"
                            aria-label="Facebook"
                            className="group flex h-11 w-11 items-center justify-center rounded-xl border border-[#eadfc3] bg-[#fffdf8] transition duration-300 hover:-translate-y-1 hover:border-[#d4af37] hover:bg-[#f8f5ef]"
                        >
                          <svg
                              viewBox="0 0 24 24"
                              className="h-5 w-5 fill-[#1b1b1b] transition group-hover:fill-[#b88b16]"
                          >
                            <path
                                d="M22 12.07C22 6.49 17.52 2 12 2S2 6.49 2 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.49-3.92 3.78-3.92 1.1 0 2.25.2 2.25.2v2.48H15.2c-1.25 0-1.64.78-1.64 1.57v1.89h2.79l-.45 2.9h-2.34V22c4.78-.75 8.44-4.91 8.44-9.93z"/>
                          </svg>
                        </a>

                        <a
                            href="https://www.instagram.com/atlasentretien?igsh=YTFhZ3F3Y2VjY21z&utm_source=qr"
                            aria-label="Instagram"
                            className="group flex h-11 w-11 items-center justify-center rounded-xl border border-[#eadfc3] bg-[#fffdf8] transition duration-300 hover:-translate-y-1 hover:border-[#d4af37] hover:bg-[#f8f5ef]"
                        >
                          <svg
                              viewBox="0 0 24 24"
                              className="h-5 w-5 fill-[#1b1b1b] transition group-hover:fill-[#b88b16]"
                          >
                            <path
                                d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5zm8.95 1.35a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.8A3.2 3.2 0 1 0 12 15.2 3.2 3.2 0 0 0 12 8.8z"/>
                          </svg>
                        </a>

                        <a
                            href="mailto:infatlaspro@gmail.com"
                            aria-label="Courriel"
                            className="group flex h-11 w-11 items-center justify-center rounded-xl border border-[#eadfc3] bg-[#fffdf8] transition duration-300 hover:-translate-y-1 hover:border-[#d4af37] hover:bg-[#f8f5ef]"
                        >
                          <svg
                              viewBox="0 0 24 24"
                              className="h-5 w-5 fill-[#1b1b1b] transition group-hover:fill-[#b88b16]"
                          >
                            <path
                                d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm0 2v.51l9 6.23 9-6.23V7H3zm18 10V9.95l-8.43 5.84a1 1 0 0 1-1.14 0L3 9.95V17h18z"/>
                          </svg>
                        </a>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── Estimé form ── */}
          <section id="estime" className="border-t border-[#eadfc3] bg-[#f3ede0]">
            <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
              <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">

                {/* Left copy */}
                <div className="fade-up">
                  <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#b88b16]">
                    Demande d&#39;estimé
                  </p>
                  <h2 className="mt-3 text-4xl font-bold text-[#1b1b1b] md:text-5xl">
                    Obtenir un estimé
                  </h2>
                  <p className="mt-5 max-w-sm text-base leading-8 text-zinc-600">
                    Remplissez le formulaire avec vos informations et une courte description des
                    travaux à faire. Plus tard, on pourra le connecter pour que les demandes soient
                    envoyées directement par courriel.
                  </p>

                  {/* Trust signals */}
                  <div className="mt-10 space-y-3">
                    {['Réponse rapide garantie', 'Estimé sans engagement', 'Service professionnel et soigné'].map((t) => (
                        <div key={t} className="flex items-center gap-3 text-sm text-zinc-600">
                          <span
                              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#d4af37]/20 text-[#b88b16] text-xs font-bold">✓</span>
                          {t}
                        </div>
                    ))}
                  </div>
                </div>

                {/* Form card */}
                <form
                    onSubmit={handleSubmit}
                    className="fade-up-delayed grid gap-4 rounded-[2rem] border border-[#eadfc3] bg-white p-8 shadow-2xl"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold uppercase tracking-[0.15em] text-zinc-400">
                        Nom du client
                      </label>
                      <input
                          name="nom"
                          value={formData.nom}
                          onChange={handleChange}
                          required
                          className="rounded-xl border border-[#e6dcc1] bg-[#fffdf8] px-4 py-3 text-[#1b1b1b] outline-none placeholder:text-zinc-400 focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold uppercase tracking-[0.15em] text-zinc-400">
                        Téléphone
                      </label>
                      <input
                          name="telephone"
                          type="tel"
                          inputMode="tel"
                          value={formData.telephone}
                          onChange={handleChange}
                          required
                          placeholder="819-000-0000"
                          className="rounded-xl border border-[#e6dcc1] bg-[#fffdf8] px-4 py-3 text-[#1b1b1b] outline-none placeholder:text-zinc-400 focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-[0.15em] text-zinc-400">
                      Adresse
                    </label>
                    <input
                        name="adresse"
                        value={formData.adresse}
                        onChange={handleChange}
                        required
                        placeholder="123 Rue des Érables, Gatineau"
                        className="rounded-xl border border-[#e6dcc1] bg-[#fffdf8] px-4 py-3 text-[#1b1b1b] outline-none placeholder:text-zinc-400 focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-[0.15em] text-zinc-400">
                      Type de travaux
                    </label>
                    <input
                        name="typeTravaux"
                        value={formData.typeTravaux}
                        onChange={handleChange}
                        required
                        placeholder="Asphalte, paysagement, peinture…"
                        className="rounded-xl border border-[#e6dcc1] bg-[#fffdf8] px-4 py-3 text-[#1b1b1b] outline-none placeholder:text-zinc-400 focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-[0.15em] text-zinc-400">
                      Description des travaux
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="min-h-[140px] resize-none rounded-xl border border-[#e6dcc1] bg-[#fffdf8] px-4 py-3 text-[#1b1b1b] outline-none placeholder:text-zinc-400 focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition"
                        placeholder="Décrivez brièvement votre projet…"
                    />
                  </div>

                  {message && (
                      <p className="text-sm font-semibold text-[#1b1b1b]">{message}</p>
                  )}

                  <button
                      type="submit"
                      disabled={loading}
                      className="mt-1 rounded-xl bg-[#d4af37] px-6 py-4 text-sm font-bold tracking-wide text-black shadow-[0_4px_20px_rgba(212,175,55,0.35)] transition duration-300 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(212,175,55,0.5)] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? "Envoi en cours..." : "Envoyer la demande →"}
                  </button>
                </form>
              </div>
            </div>
          </section>
        </main>

        {/* Floating CTA */}
        <a
            href="#estime"
            aria-label="Aller au formulaire de demande d'estimé"
            className="group fixed bottom-5 right-5 z-50 flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-[#d4af37] text-black shadow-[0_4px_24px_rgba(212,175,55,0.55)] transition duration-300 hover:-translate-y-1 hover:scale-105"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6 md:h-7 md:w-7 fill-current">
            <path
                d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm0 2v.51l9 6.23 9-6.23V7H3zm18 10V9.95l-8.43 5.84a1 1 0 0 1-1.14 0L3 9.95V17h18z"/>
          </svg>
        </a>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-[#111111] text-zinc-400">
          <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
            <div className="flex flex-col gap-6 text-sm md:flex-row md:items-start md:justify-between">

              <div className="space-y-2">
                <p>© 2026 Atlas Entretien. Tous droits réservés.</p>
                <p>RBQ : À venir ...</p>
                <p>Régions desservies : Gatineau / Ottawa</p>
              </div>

              <div className="space-y-2">
                <p className="font-medium text-white">Coordonnées</p>
                <div className="flex flex-col gap-1">
                  <a href="tel:8733763841" className="transition hover:text-[#f3d77a]">
                    873-376-3841
                  </a>
                  <a href="tel:8736600926" className="transition hover:text-[#f3d77a]">
                    873-660-0926
                  </a>
                  <a href="mailto:infatlaspro@gmail.com" className="transition hover:text-[#f3d77a]">
                    infatlaspro@gmail.com
                  </a>
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-medium text-white">Suivez-nous</p>
                <div className="flex flex-wrap gap-5">
                  <a href="#" className="transition hover:text-[#f3d77a]">
                    Facebook
                  </a>
                  <a href="#" className="transition hover:text-[#f3d77a]">
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
  )
}

export default App

