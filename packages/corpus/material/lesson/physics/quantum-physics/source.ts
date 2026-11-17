import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/physics/quantum-physics",
  domain: "physics",
  key: "lesson.physics.quantum-physics",
  kind: "lesson",
  routeSlugs: {
    en: "quantum-physics",
    id: "fisika-kuantum",
    de: "quantenphysik",
    ms: "fizik-kuantum",
  },
  sections: ["photoelectric-effect"],
  slug: "quantum-physics",
  translations: {
    en: {
      description: "Work out photon energies and the photoelectric effect.",
      title: "Quantum Physics",
    },
    id: {
      description: "Hitung energi foton dan jelaskan efek fotolistrik.",
      title: "Fisika Kuantum",
    },
    de: {
      description: "Berechne Photonenenergien und erklär den Photoeffekt.",
      title: "Quantenphysik",
    },
    ms: {
      description: "Kira tenaga foton dan terangkan kesan fotoelektrik.",
      title: "Fizik Kuantum",
    },
  },
};

export default lesson;
