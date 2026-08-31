import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Produktangaben müssen Lieferstufen unterscheiden, damit sie für Käufer knapp und bei Prüfungen rückverfolgbar bleiben.",
        },
        {
          isCorrect: false,
          label:
            "Der Maniok wurde im Dorf Rawa geschnitten und in der Stadt frittiert.",
        },
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
            "Ein Verpackungscode wird zu einem vollständigen Lieferkettendatensatz führen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Product-origin information must distinguish supply-chain stages so it remains concise for buyers and traceable during inspection.",
        },
        {
          isCorrect: false,
          label:
            "The cassava was sliced in Rawa Village and fried in the city.",
        },
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
          label: "A package code will link to a fuller supply-chain record.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Informasi asal produk perlu memisahkan tahap rantai pasok agar ringkas bagi pembeli sekaligus dapat ditelusuri saat pemeriksaan.",
        },
        {
          isCorrect: false,
          label: "Singkong diiris di Desa Rawa dan digoreng di kota.",
        },
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
          label:
            "Kode kemasan akan mengarah ke catatan rantai pasok yang lebih lengkap.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
