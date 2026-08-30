import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Nach Sonnenaufgang erreichte die Lufttemperatur fünf Grad.",
        },
        {
          isCorrect: false,
          label: "Sri Utami erklärte, dass der Frost jedes Jahr auftritt.",
        },
        {
          isCorrect: false,
          label: "Klare Eiskristalle bedeckten das Gras.",
        },
        {
          isCorrect: false,
          label: "Besucher, die früh ankamen, fotografierten den Frost.",
        },
        {
          isCorrect: false,
          label: "Weil der Himmel klar war, bildete sich Frost auf dem Gras.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "After sunrise, the air temperature reached five degrees.",
        },
        {
          isCorrect: false,
          label: "Sri Utami explained that frost occurs every year.",
        },
        {
          isCorrect: false,
          label: "Clear ice crystals covered the grass.",
        },
        {
          isCorrect: false,
          label: "Visitors who arrived early photographed the frost.",
        },
        {
          isCorrect: false,
          label: "Because the sky was clear, frost formed on the grass.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Setelah matahari terbit, suhu udara mencapai lima derajat.",
        },
        {
          isCorrect: false,
          label: "Sri Utami menjelaskan bahwa embun es terjadi setiap tahun.",
        },
        {
          isCorrect: false,
          label: "Kristal es bening menutupi rumput.",
        },
        {
          isCorrect: false,
          label: "Pengunjung yang datang lebih awal memotret embun es.",
        },
        {
          isCorrect: false,
          label: "Karena langit cerah, embun es terbentuk di atas rumput.",
        },
      ],
    },
  },
};

export default item;
