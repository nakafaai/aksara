import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label:
        "The government purchase price for grain, GKP, from farmers always decreases from January to April",
      value: false,
    },
    {
      label:
        "Grain prices at the farmer level always fluctuate (up and down) during the last four months",
      value: false,
    },
    {
      label:
        "Grain prices at the farmer level are inversely proportional to the government purchase price for GKP",
      value: false,
    },
    {
      label:
        "The government purchase price for GKP remained unchanged from January to April",
      value: true,
    },
    {
      label:
        "The lowest difference between grain prices and government purchase prices occurred in April as happened in March",
      value: false,
    },
  ],
  id: [
    {
      label:
        "Harga pembelian pemerintah terhadap gabah, GKP, petani selalu mengalami penurunan dari Januari hingga April",
      value: false,
    },
    {
      label:
        "Harga gabah di tingkat petani selalu mengalami naik turun (fluktuasi) selama empat bulan terakhir",
      value: false,
    },
    {
      label:
        "Harga gabah di tingkat petani berbanding terbalik dengan harga pembelian pemerintah terhadap GKP",
      value: false,
    },
    {
      label:
        "Harga pembelian pemerintah untuk GKP tetap dan tidak berubah dari Januari sampai April",
      value: true,
    },
    {
      label:
        "Selisih harga gabah dengan harga pembelian pemerintah terendah terjadi pada bulan April sebagaimana yang terjadi pada bulan Maret",
      value: false,
    },
  ],
};

export default choices;
