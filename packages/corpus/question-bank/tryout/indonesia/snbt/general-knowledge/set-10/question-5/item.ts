import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Produktangaben müssen Lieferstufen unterscheiden, damit sie für Käufer knapp und bei Prüfungen rückverfolgbar bleiben.",
        },
        {
          isCorrect: true,
          label:
            "In der Simulation begrenzten geschichtete Aufzeichnungen den Rückruf besser als ein einzelner Ortsname.",
        },
        {
          isCorrect: false,
          label:
            "Die Marktleitung schlägt ein Herkunftslabel nach dem letzten Verpackungsort vor.",
        },
        {
          isCorrect: false,
          label:
            "Ein Verpackungscode wird zu einem vollständigen Lieferkettendatensatz führen.",
        },
        {
          isCorrect: false,
          label:
            "Jede Produktionsstufe muss vollständig auf die Vorderseite jeder Packung gedruckt werden.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Product-origin information must distinguish supply-chain stages so it remains concise for buyers and traceable during inspection.",
        },
        {
          isCorrect: true,
          label:
            "In the simulation, layered records narrowed the products requiring withdrawal compared with a single-location label.",
        },
        {
          isCorrect: false,
          label:
            "Market managers propose one origin label based on the place where the product was last packed.",
        },
        {
          isCorrect: false,
          label: "A package code will link to a fuller supply-chain record.",
        },
        {
          isCorrect: false,
          label:
            "Every production stage must be printed in full on the front of every package.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Informasi asal produk perlu memisahkan tahap rantai pasok agar ringkas bagi pembeli sekaligus dapat ditelusuri saat pemeriksaan.",
        },
        {
          isCorrect: true,
          label:
            "Dalam simulasi, catatan berlapis mempersempit produk yang harus ditarik dibanding label satu lokasi.",
        },
        {
          isCorrect: false,
          label:
            "Pengelola pasar mengusulkan satu label asal berdasarkan tempat produk terakhir dikemas.",
        },
        {
          isCorrect: false,
          label:
            "Kode kemasan akan mengarah ke catatan rantai pasok yang lebih lengkap.",
        },
        {
          isCorrect: false,
          label:
            "Semua tahap produksi harus dicetak lengkap di bagian depan setiap kemasan.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
