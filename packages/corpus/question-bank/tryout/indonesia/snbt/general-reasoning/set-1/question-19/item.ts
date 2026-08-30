import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Beikost wird im Allgemeinen ab einem Alter von etwa $$6$$ Monaten eingeführt.",
        },
        {
          isCorrect: false,
          label:
            "Das Stillen kann nach der Einführung von Beikost fortgesetzt werden.",
        },
        {
          isCorrect: false,
          label: "Beikost soll ausreichend, sicher und nährstoffreich sein.",
        },
        {
          isCorrect: false,
          label:
            "Obst und Gemüse sind Bestandteil einer abwechslungsreichen Beikost.",
        },
        {
          isCorrect: true,
          label:
            "Gemüse allein deckt nach dem Alter von $$6$$ Monaten alle benötigten Lebensmittelgruppen ab.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Complementary foods are generally introduced at about $$6$$ months of age.",
        },
        {
          isCorrect: false,
          label:
            "Breastfeeding can continue after complementary foods are introduced.",
        },
        {
          isCorrect: false,
          label:
            "Complementary foods should be adequate, safe, and nutrient-dense.",
        },
        {
          isCorrect: false,
          label:
            "Fruits and vegetables are part of a diverse complementary diet.",
        },
        {
          isCorrect: true,
          label:
            "Vegetables alone provide every food group an infant needs after $$6$$ months.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Makanan pendamping umumnya mulai diberikan sekitar usia $$6$$ bulan.",
        },
        {
          isCorrect: false,
          label:
            "Pemberian ASI dapat dilanjutkan setelah makanan pendamping mulai diberikan.",
        },
        {
          isCorrect: false,
          label: "Makanan pendamping harus cukup, aman, dan padat gizi.",
        },
        {
          isCorrect: false,
          label:
            "Buah dan sayuran merupakan bagian dari makanan pendamping yang beragam.",
        },
        {
          isCorrect: true,
          label:
            "Sayuran saja menyediakan seluruh kelompok makanan yang dibutuhkan bayi setelah usia $$6$$ bulan.",
        },
      ],
    },
  },
};

export default item;
