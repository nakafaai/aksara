import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Der Direktor sagt beide Vorhaben für dieses Jahr ab.",
        },
        {
          isCorrect: false,
          label:
            "Der Direktor verschiebt beide Vorhaben bis zur Erteilung der Genehmigung.",
        },
        {
          isCorrect: true,
          label: "PT Batik verkauft das neue Produkt in diesem Jahr.",
        },
        {
          isCorrect: false,
          label: "PT Batik verkauft das neue Produkt in diesem Jahr nicht.",
        },
        {
          isCorrect: false,
          label: "PT Batik setzt in diesem Jahr keines der beiden Vorhaben um.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "The director cancels both programs this year.",
        },
        {
          isCorrect: false,
          label:
            "The director postpones both programs until the permit is complete.",
        },
        {
          isCorrect: true,
          label: "PT Batik sells the new product this year.",
        },
        {
          isCorrect: false,
          label: "PT Batik does not sell the new product this year.",
        },
        {
          isCorrect: false,
          label: "PT Batik carries out neither program this year.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Direktur membatalkan kedua program pada tahun ini.",
        },
        {
          isCorrect: false,
          label: "Direktur menunda kedua program sampai izin selesai.",
        },
        {
          isCorrect: true,
          label: "PT Batik menjual produk baru pada tahun ini.",
        },
        {
          isCorrect: false,
          label: "PT Batik tidak menjual produk baru pada tahun ini.",
        },
        {
          isCorrect: false,
          label: "PT Batik tidak menjalankan satu pun program pada tahun ini.",
        },
      ],
    },
  },
};

export default item;
