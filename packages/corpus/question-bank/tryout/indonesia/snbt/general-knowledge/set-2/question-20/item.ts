import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Das Fischereimanagement braucht verlässliche Daten, sodass Entscheidungen auf örtliche Bedingungen reagieren können.",
        },
        {
          isCorrect: false,
          label:
            "Das ist eine große Menge, doch Nachhaltigkeit lässt sich nicht allein an der Tonnage messen.",
        },
        {
          isCorrect: false,
          label:
            "Das von der FAO und dem Ministerium unterstützte IFish-Programm fördert ökosystembasiertes Management, nationale Kompetenzstandards und die Beteiligung lokaler Gemeinschaften an der Binnenfischerei.",
        },
        {
          isCorrect: false,
          label:
            "Einfach mehr Fanggeräte einzusetzen, könnte den Druck erhöhen, ohne Management- oder Umweltprobleme zu lösen.",
        },
        {
          isCorrect: false,
          label:
            "Langfristige Produktion hängt von leistungsfähigen Systemen ab, in denen Bestände und Lebensräume gesund bleiben.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Fisheries managers need reliable data, so decisions can respond to local conditions.",
        },
        {
          isCorrect: false,
          label:
            "That is a large volume, but production cannot be judged sustainably by tonnage alone.",
        },
        {
          isCorrect: false,
          label:
            "The FAO and ministry-backed IFish programme promotes ecosystem-based management, national competency standards, and community participation in inland fisheries.",
        },
        {
          isCorrect: false,
          label:
            "Simply adding more fishing gear could intensify pressure without solving management or environmental problems.",
        },
        {
          isCorrect: false,
          label:
            "Long-term production depends on productive systems whose stocks and habitats remain healthy.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Pengelola perikanan memerlukan data yang andal sehingga keputusan dapat menyesuaikan kondisi setempat.",
        },
        {
          isCorrect: false,
          label:
            "Volumenya besar, tetapi keberlanjutan produksi tidak dapat dinilai dari jumlah tonase saja.",
        },
        {
          isCorrect: false,
          label:
            "Program IFish yang didukung FAO dan kementerian mendorong pengelolaan berbasis ekosistem, standar kompetensi nasional, dan partisipasi masyarakat dalam perikanan darat.",
        },
        {
          isCorrect: false,
          label:
            "Sekadar menambah alat tangkap dapat meningkatkan tekanan tanpa menyelesaikan masalah pengelolaan atau lingkungan.",
        },
        {
          isCorrect: false,
          label:
            "Produksi jangka panjang bergantung pada sistem produktif yang menjaga kesehatan stok dan habitat.",
        },
      ],
    },
  },
};

export default item;
