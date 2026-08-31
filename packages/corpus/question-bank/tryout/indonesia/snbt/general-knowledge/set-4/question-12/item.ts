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
            "Der im Durchschnitt sichtbare Zeitvorteil muss bei wirklich vergleichbaren Vorgängen erneut geprüft werden.",
        },
        {
          isCorrect: false,
          label:
            "Vorteile digitaler Zahlungen müssen mit vergleichbaren Daten und unter Berücksichtigung des Zugangs bewertet werden; ihre Ergänzung rechtfertigt nicht automatisch die Abschaffung von Bargeld.",
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
            "The speed shown by the average should be retested among genuinely comparable transactions.",
        },
        {
          isCorrect: false,
          label:
            "Digital payment benefits must be judged with comparable data and user access, so adding it does not automatically justify removing cash.",
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
            "Kecepatan yang tampak pada rata-rata perlu diuji lagi pada kelompok transaksi yang benar-benar sebanding.",
        },
        {
          isCorrect: false,
          label:
            "Manfaat pembayaran digital perlu dinilai dengan data yang sebanding dan akses pengguna, sehingga penambahannya tidak otomatis berarti penghapusan tunai.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
