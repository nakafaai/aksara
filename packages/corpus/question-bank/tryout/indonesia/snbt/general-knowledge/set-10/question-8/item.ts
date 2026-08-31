import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Jede Produktionsstufe muss vollständig auf die Vorderseite jeder Packung gedruckt werden.",
        },
        {
          isCorrect: false,
          label:
            "Mit einem Code müssen Lieferantendaten nicht mehr aktualisiert werden.",
        },
        {
          isCorrect: false,
          label:
            "Der Maniok wurde im Dorf Rawa geschnitten und in der Stadt frittiert.",
        },
        {
          isCorrect: false,
          label:
            "Ein Verpackungscode wird zu einem vollständigen Lieferkettendatensatz führen.",
        },
        {
          isCorrect: true,
          label:
            "Der Nutzen eines Codes hängt von Qualität und Aktualisierung der dahinterliegenden Daten ab.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Every production stage must be printed in full on the front of every package.",
        },
        {
          isCorrect: false,
          label:
            "Once a code exists, supplier records no longer need updating.",
        },
        {
          isCorrect: false,
          label:
            "The cassava was sliced in Rawa Village and fried in the city.",
        },
        {
          isCorrect: false,
          label: "A package code will link to a fuller supply-chain record.",
        },
        {
          isCorrect: true,
          label:
            "The usefulness of a code depends on the quality and updating of the records behind it.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Semua tahap produksi harus dicetak lengkap di bagian depan setiap kemasan.",
        },
        {
          isCorrect: false,
          label:
            "Jika kode tersedia, catatan pemasok tidak perlu lagi diperbarui.",
        },
        {
          isCorrect: false,
          label: "Singkong diiris di Desa Rawa dan digoreng di kota.",
        },
        {
          isCorrect: false,
          label:
            "Kode kemasan akan mengarah ke catatan rantai pasok yang lebih lengkap.",
        },
        {
          isCorrect: true,
          label:
            "Kegunaan kode bergantung pada mutu dan pembaruan catatan di belakangnya.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
