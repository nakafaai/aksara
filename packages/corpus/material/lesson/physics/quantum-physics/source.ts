import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonPhysicsQuantumPhysicsMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/physics/quantum-physics",
  domain: "physics",
  key: "lesson.physics.quantum-physics",
  kind: "lesson",
  routeSlugs: {
    de: "quantenphysik",
    en: "quantum-physics",
    id: "fisika-kuantum",
    ms: "fizik-kuantum",
  },
  sections: [
    {
      evidenceUrls: [
        "https://openstax.org/books/college-physics-2e/pages/29-1-quantization-of-energy",
        "https://openstax.org/books/college-physics-2e/pages/29-2-the-photoelectric-effect",
        "https://openstax.org/books/college-physics-2e/pages/29-3-photon-energies-and-the-electromagnetic-spectrum",
        "https://openstax.org/books/college-physics-2e/pages/29-6-the-wave-nature-of-matter",
        "https://openstax.org/books/college-physics-2e/pages/30-3-bohrs-theory-of-the-hydrogen-atom",
      ],
      routeSlugs: {
        de: "photonen-und-photoeffekt",
        en: "photons-and-the-photoelectric-effect",
        id: "foton-dan-efek-fotolistrik",
        ms: "foton-dan-kesan-fotoelektrik",
      },
      slug: "photoelectric-effect",
    },
  ],
  slug: "quantum-physics",
  translations: {
    de: {
      description: "Berechne Photonenenergien und erklär den Photoeffekt.",
      title: "Quantenphysik",
    },
    en: {
      description: "Work out photon energies and the photoelectric effect.",
      title: "Quantum Physics",
    },
    id: {
      description: "Hitung energi foton dan jelaskan efek fotolistrik.",
      title: "Fisika Kuantum",
    },
    ms: {
      description: "Kira tenaga foton dan terangkan kesan fotoelektrik.",
      title: "Fizik Kuantum",
    },
  },
});
