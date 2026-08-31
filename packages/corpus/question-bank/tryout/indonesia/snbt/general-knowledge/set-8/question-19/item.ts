import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bürgerdaten können das Mangrovenmonitoring unterstützen, wenn Beobachtungsmöglichkeit und Klassifikationsgenauigkeit kalibriert werden.",
        },
        {
          isCorrect: true,
          label:
            "Standorte nahe der Straße hatten viele Meldungen und waren zugleich am leichtesten erreichbar.",
        },
        {
          isCorrect: false,
          label:
            "Einige Freiwillige wollen alle Beobachtungen ungeprüft aufnehmen, weil dadurch mehr Daten entstehen.",
        },
        {
          isCorrect: false,
          label:
            "Die öffentliche Karte wird Meldungen, Beobachtungsintensität und Validierung trennen.",
        },
        {
          isCorrect: false,
          label:
            "Klassifikationsfehler machen sämtliche Freiwilligendaten wissenschaftlich wertlos.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Community data can support mangrove monitoring when observation opportunity and classification accuracy are calibrated.",
        },
        {
          isCorrect: true,
          label:
            "Sites near the road had many reports and were also the easiest to visit.",
        },
        {
          isCorrect: false,
          label:
            "Some volunteers propose including every observation without review because the data set would be larger.",
        },
        {
          isCorrect: false,
          label:
            "The public map will separate reports, observation intensity, and validation.",
        },
        {
          isCorrect: false,
          label:
            "Classification errors make all volunteer data scientifically worthless.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Data warga dapat mendukung pemantauan mangrove jika peluang pengamatan dan ketepatan klasifikasi dikalibrasi.",
        },
        {
          isCorrect: true,
          label:
            "Lokasi dekat jalan memiliki banyak laporan sekaligus paling mudah dikunjungi.",
        },
        {
          isCorrect: false,
          label:
            "Sebagian relawan mengusulkan agar seluruh pengamatan langsung dimasukkan tanpa pemeriksaan karena jumlah data akan lebih besar.",
        },
        {
          isCorrect: false,
          label:
            "Peta publik akan memisahkan laporan, intensitas pengamatan, dan validasi.",
        },
        {
          isCorrect: false,
          label:
            "Kesalahan klasifikasi membuat seluruh data relawan tidak memiliki nilai ilmiah.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
