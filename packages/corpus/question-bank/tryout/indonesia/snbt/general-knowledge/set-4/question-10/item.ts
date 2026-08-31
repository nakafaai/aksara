import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bei einem neuen Vergleich mit gleicher Artikelzahl bleibt die digitale Spur in allen Altersgruppen schneller.",
        },
        {
          isCorrect: true,
          label:
            "Bei digitalen Zahlungen begann die Zeitmessung erst nach dem Scannen, bei Barzahlungen schon mit dem ersten Artikel.",
        },
        {
          isCorrect: false,
          label:
            "Nach einer besser sichtbaren Beschilderung wählen mehr ältere Käufer die digitale Spur, doch die gemessene Abfertigungszeit pro Einkauf bleibt gleich.",
        },
        {
          isCorrect: false,
          label:
            "Im nächsten Test wird das Netz verbessert und werden Einkäufe mit ähnlicher Artikelzahl verglichen.",
        },
        {
          isCorrect: false,
          label:
            "Die Beschwerden über das Signal konzentrierten sich auf einen Marktgang.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "In a new comparison with equal item counts, the digital lane remains faster across all age groups.",
        },
        {
          isCorrect: true,
          label:
            "Digital timing began after scanning, while cash timing began when the first item was placed down.",
        },
        {
          isCorrect: false,
          label:
            "After the signs are made more visible, more older shoppers choose the digital lane, but the measured service time per purchase remains unchanged.",
        },
        {
          isCorrect: false,
          label:
            "The next test will improve the network and compare purchases with similar item counts.",
        },
        {
          isCorrect: false,
          label: "Signal complaints were concentrated in one market aisle.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Dalam perbandingan baru dengan jumlah barang yang sama, jalur digital tetap lebih cepat pada semua kelompok usia.",
        },
        {
          isCorrect: true,
          label:
            "Pencatatan waktu digital dimulai setelah barang dipindai, sedangkan waktu tunai dihitung sejak barang pertama diletakkan.",
        },
        {
          isCorrect: false,
          label:
            "Setelah papan petunjuk dibuat lebih terlihat, lebih banyak pembeli lansia memilih jalur digital, tetapi waktu layanan terukur per transaksi tetap sama.",
        },
        {
          isCorrect: false,
          label:
            "Uji berikutnya akan memperbaiki jaringan dan membandingkan jumlah barang yang sebanding.",
        },
        {
          isCorrect: false,
          label:
            "Keluhan sinyal terkonsentrasi pada satu lorong di sisi pasar.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
