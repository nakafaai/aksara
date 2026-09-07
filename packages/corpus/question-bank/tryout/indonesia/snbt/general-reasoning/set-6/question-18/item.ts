import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Alle frittierten Lebensmittel enthalten industrielle Transfette.",
        },
        {
          isCorrect: false,
          label:
            "Weniger industrielle Transfette zu verzehren, garantiert, dass keine koronare Herzkrankheit auftritt.",
        },
        {
          isCorrect: false,
          label:
            "Die Veränderungen von LDL und HDL heben sich auf, sodass das Herzkrankheitsrisiko unverändert bleibt.",
        },
        {
          isCorrect: true,
          label:
            "Ein geringerer Verzehr industrieller Transfette verringert die Belastung durch einen vermeidbaren ernährungsbedingten Risikofaktor für koronare Herzkrankheiten.",
        },
        {
          isCorrect: false,
          label:
            "Eine Begrenzung industrieller Transfette nützt nur Menschen, die bereits an einer koronaren Herzkrankheit leiden.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Every fried food contains industrial trans fat.",
        },
        {
          isCorrect: false,
          label:
            "Reducing industrial trans-fat intake guarantees that coronary heart disease will not occur.",
        },
        {
          isCorrect: false,
          label:
            "The LDL and HDL changes cancel each other out, leaving heart-disease risk unchanged.",
        },
        {
          isCorrect: true,
          label:
            "Reducing industrial trans-fat intake reduces exposure to a preventable dietary risk for coronary heart disease.",
        },
        {
          isCorrect: false,
          label:
            "Limiting industrial trans fat is useful only for people who already have coronary heart disease.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Semua makanan gorengan mengandung lemak trans industri.",
        },
        {
          isCorrect: false,
          label:
            "Mengurangi konsumsi lemak trans industri menjamin seseorang tidak mengalami penyakit jantung koroner.",
        },
        {
          isCorrect: false,
          label:
            "Perubahan LDL dan HDL saling meniadakan sehingga risiko penyakit jantung tidak berubah.",
        },
        {
          isCorrect: true,
          label:
            "Mengurangi konsumsi lemak trans industri mengurangi paparan terhadap faktor risiko pola makan yang dapat dicegah untuk penyakit jantung koroner.",
        },
        {
          isCorrect: false,
          label:
            "Membatasi lemak trans industri hanya bermanfaat bagi orang yang sudah menderita penyakit jantung koroner.",
        },
      ],
    },
  },
};

export default item;
