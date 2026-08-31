import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Digitale Zahlung ist nachweislich immer schneller und sollte Bargeld auf jedem Markt ersetzen.",
        },
        {
          isCorrect: false,
          label:
            "Weil einige Nutzer Hindernisse erleben, sollte die digitale Spur trotz ihres Nutzens für andere abgeschafft werden.",
        },
        {
          isCorrect: false,
          label:
            "Die Beschwerden über das Signal konzentrierten sich auf einen Marktgang.",
        },
        {
          isCorrect: true,
          label:
            "Die ersten Daten stützen eine begrenzte Erweiterung, aber keine digitale Pflicht für alle Zahlungen.",
        },
        {
          isCorrect: false,
          label:
            "Im nächsten Test wird das Netz verbessert und werden Einkäufe mit ähnlicher Artikelzahl verglichen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Digital payment is proven always faster and should replace cash in every market.",
        },
        {
          isCorrect: false,
          label:
            "Because some users face barriers, the digital lane should be removed despite benefiting other groups.",
        },
        {
          isCorrect: false,
          label: "Signal complaints were concentrated in one market aisle.",
        },
        {
          isCorrect: true,
          label:
            "The initial data support a limited expansion but not a digital mandate for every transaction.",
        },
        {
          isCorrect: false,
          label:
            "The next test will improve the network and compare purchases with similar item counts.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pembayaran digital terbukti selalu lebih cepat dan harus menggantikan uang tunai di semua pasar.",
        },
        {
          isCorrect: false,
          label:
            "Karena sebagian pengguna mengalami kendala, jalur digital sebaiknya dihapus meskipun bermanfaat bagi kelompok lain.",
        },
        {
          isCorrect: false,
          label:
            "Keluhan sinyal terkonsentrasi pada satu lorong di sisi pasar.",
        },
        {
          isCorrect: true,
          label:
            "Data awal mendukung perluasan terbatas, tetapi belum mendukung kewajiban digital bagi semua transaksi.",
        },
        {
          isCorrect: false,
          label:
            "Uji berikutnya akan memperbaiki jaringan dan membandingkan jumlah barang yang sebanding.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
