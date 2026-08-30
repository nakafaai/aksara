import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Beikost wird im Allgemeinen ab einem Alter von etwa ",
            },
            { display: "block", kind: "math", math: "6" },
            { kind: "text", text: " Monaten eingeführt." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Das Stillen kann nach der Einführung von Beikost fortgesetzt werden.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Beikost soll ausreichend, sicher und nährstoffreich sein.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Obst und Gemüse sind Bestandteil einer abwechslungsreichen Beikost.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Gemüse allein deckt nach dem Alter von " },
            { display: "block", kind: "math", math: "6" },
            {
              kind: "text",
              text: " Monaten alle benötigten Lebensmittelgruppen ab.",
            },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Complementary foods are generally introduced at about ",
            },
            { display: "block", kind: "math", math: "6" },
            { kind: "text", text: " months of age." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Breastfeeding can continue after complementary foods are introduced.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Complementary foods should be adequate, safe, and nutrient-dense.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Fruits and vegetables are part of a diverse complementary diet.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Vegetables alone provide every food group an infant needs after ",
            },
            { display: "block", kind: "math", math: "6" },
            { kind: "text", text: " months." },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Makanan pendamping umumnya mulai diberikan sekitar usia ",
            },
            { display: "block", kind: "math", math: "6" },
            { kind: "text", text: " bulan." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Pemberian ASI dapat dilanjutkan setelah makanan pendamping mulai diberikan.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Makanan pendamping harus cukup, aman, dan padat gizi.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Buah dan sayuran merupakan bagian dari makanan pendamping yang beragam.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Sayuran saja menyediakan seluruh kelompok makanan yang dibutuhkan bayi setelah usia ",
            },
            { display: "block", kind: "math", math: "6" },
            { kind: "text", text: " bulan." },
          ],
        },
      ],
    },
  },
};

export default item;
