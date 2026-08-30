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
              text: "Der Direktor sagt beide Vorhaben für dieses Jahr ab.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Der Direktor verschiebt beide Vorhaben bis zur Erteilung der Genehmigung.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "PT Batik verkauft das neue Produkt in diesem Jahr nicht.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "PT Batik setzt in diesem Jahr keines der beiden Vorhaben um.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "PT Batik verkauft das neue Produkt in diesem Jahr.",
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
              text: "The director cancels both programs this year.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The director postpones both programs until the permit is complete.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "PT Batik does not sell the new product this year.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "PT Batik carries out neither program this year.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "PT Batik sells the new product this year." },
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
              text: "Direktur membatalkan kedua program pada tahun ini.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Direktur menunda kedua program sampai izin selesai.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "PT Batik tidak menjual produk baru pada tahun ini.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "PT Batik tidak menjalankan satu pun program pada tahun ini.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "PT Batik menjual produk baru pada tahun ini.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
