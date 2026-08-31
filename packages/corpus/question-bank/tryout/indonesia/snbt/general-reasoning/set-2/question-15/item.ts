import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Der staatliche Ankaufspreis für GKP bleibt von Januar bis April unverändert",
        },
        {
          isCorrect: false,
          label:
            "Der staatliche Ankaufspreis für GKP sinkt von Januar bis April durchgehend",
        },
        {
          isCorrect: false,
          label:
            "Der Erzeugerpreis für Rohreis steigt und fällt in jedem der vier Monate",
        },
        {
          isCorrect: false,
          label:
            "Der Erzeugerpreis für Rohreis ist umgekehrt proportional zum staatlichen Ankaufspreis für GKP",
        },
        {
          isCorrect: false,
          label:
            "Im März und April ist die Differenz zwischen Erzeugerpreis und staatlichem Ankaufspreis gleich groß",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "The government purchase price for GKP remained unchanged from January to April",
        },
        {
          isCorrect: false,
          label:
            "The government purchase price for grain, GKP, from farmers always decreases from January to April",
        },
        {
          isCorrect: false,
          label:
            "Grain prices at the farmer level always fluctuate (up and down) during the last four months",
        },
        {
          isCorrect: false,
          label:
            "Grain prices at the farmer level are inversely proportional to the government purchase price for GKP",
        },
        {
          isCorrect: false,
          label:
            "The lowest difference between grain prices and government purchase prices occurred in April as happened in March",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Harga pembelian pemerintah untuk GKP tetap dan tidak berubah dari Januari sampai April",
        },
        {
          isCorrect: false,
          label:
            "Harga pembelian pemerintah terhadap gabah, GKP, petani selalu mengalami penurunan dari Januari hingga April",
        },
        {
          isCorrect: false,
          label:
            "Harga gabah di tingkat petani selalu mengalami naik turun (fluktuasi) selama empat bulan terakhir",
        },
        {
          isCorrect: false,
          label:
            "Harga gabah di tingkat petani berbanding terbalik dengan harga pembelian pemerintah terhadap GKP",
        },
        {
          isCorrect: false,
          label:
            "Selisih harga gabah dengan harga pembelian pemerintah terendah terjadi pada bulan April sebagaimana yang terjadi pada bulan Maret",
        },
      ],
    },
  },
};

export default item;
