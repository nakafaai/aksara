import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "die Zunahme sportlicher Aktivität während der COVID-19-Pandemie.",
        },
        {
          isCorrect: true,
          label:
            "die Notwendigkeit, evidenzbasierte Empfehlungen zum Sport während der Pandemie von Mythen zu unterscheiden.",
        },
        {
          isCorrect: false,
          label: "die positiven Auswirkungen des Trainings auf unseren Körper.",
        },
        {
          isCorrect: false,
          label:
            "die Vielfalt der sportlichen Aktivitäten während der Pandemie.",
        },
        {
          isCorrect: false,
          label: "Bewegung ist eine der Möglichkeiten, Corona vorzubeugen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "the increase in exercise participation during the COVID-19 pandemic.",
        },
        {
          isCorrect: true,
          label:
            "the need to distinguish evidence-based exercise guidance from myths during the pandemic.",
        },
        {
          isCorrect: false,
          label: "the positive impact of exercising for our bodies.",
        },
        {
          isCorrect: false,
          label: "the variety of sports activities during the pandemic.",
        },
        {
          isCorrect: false,
          label: "exercise is one of the ways to prevent corona.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "peningkatan partisipasi olahraga selama pandemi COVID-19.",
        },
        {
          isCorrect: true,
          label:
            "perlunya membedakan panduan olahraga berbasis bukti dari mitos selama pandemi.",
        },
        {
          isCorrect: false,
          label: "dampak positif berolahraga bagi tubuh kita.",
        },
        {
          isCorrect: false,
          label: "ragam kegiatan olahraga pada masa pandemi.",
        },
        {
          isCorrect: false,
          label: "olahraga merupakan satu di antara cara mencegah corona.",
        },
      ],
    },
  },
};

export default item;
