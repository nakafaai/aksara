import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Ein Teil des Brotes aus Fabrik X enthält weder Kohlenhydrate noch Energie",
        },
        {
          isCorrect: false,
          label: "Jedes Brot aus Fabrik X verwendet proteinreiches Weizenmehl",
        },
        {
          isCorrect: false,
          label:
            "Ein Teil des proteinreichen Brotes enthält keine Kohlenhydrate",
        },
        {
          isCorrect: true,
          label:
            "Ein Teil des Brotes aus Fabrik X verwendet proteinarmes Weizenmehl",
        },
        {
          isCorrect: false,
          label: "Kein Brot aus Fabrik X verwendet proteinreiches Weizenmehl",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Some bread from Factory X contains neither carbohydrates nor energy",
        },
        {
          isCorrect: false,
          label: "All bread from Factory X uses high-protein wheat flour",
        },
        {
          isCorrect: false,
          label: "Some high-protein bread contains no carbohydrates",
        },
        {
          isCorrect: true,
          label: "Some bread from Factory X uses low-protein wheat flour",
        },
        {
          isCorrect: false,
          label: "No bread from Factory X uses high-protein wheat flour",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Sebagian roti Pabrik X tidak mengandung karbohidrat maupun energi",
        },
        {
          isCorrect: false,
          label: "Semua roti Pabrik X menggunakan tepung terigu protein tinggi",
        },
        {
          isCorrect: false,
          label: "Sebagian roti berprotein tinggi tidak mengandung karbohidrat",
        },
        {
          isCorrect: true,
          label:
            "Sebagian roti Pabrik X menggunakan tepung terigu protein rendah",
        },
        {
          isCorrect: false,
          label:
            "Tidak ada roti Pabrik X yang menggunakan tepung protein tinggi",
        },
      ],
    },
  },
};

export default item;
