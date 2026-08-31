import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Bei Flutaufnahmen blieb die Übereinstimmung geringer.",
        },
        {
          isCorrect: true,
          label:
            "Bürgerdaten können das Mangrovenmonitoring unterstützen, wenn Beobachtungsmöglichkeit und Klassifikationsgenauigkeit kalibriert werden.",
        },
        {
          isCorrect: false,
          label:
            "Klassifikationsfehler machen sämtliche Freiwilligendaten wissenschaftlich wertlos.",
        },
        {
          isCorrect: false,
          label:
            "Ein Gebiet ohne Meldungen enthält mit Sicherheit keine Mangrovensetzlinge.",
        },
        {
          isCorrect: false,
          label:
            "Die öffentliche Karte wird Meldungen, Beobachtungsintensität und Validierung trennen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Agreement remained lower for high-tide photographs.",
        },
        {
          isCorrect: true,
          label:
            "Community data can support mangrove monitoring when observation opportunity and classification accuracy are calibrated.",
        },
        {
          isCorrect: false,
          label:
            "Classification errors make all volunteer data scientifically worthless.",
        },
        {
          isCorrect: false,
          label:
            "An area without reports certainly contains no mangrove seedlings.",
        },
        {
          isCorrect: false,
          label:
            "The public map will separate reports, observation intensity, and validation.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kesepakatan pada foto saat air pasang tetap lebih rendah.",
        },
        {
          isCorrect: true,
          label:
            "Data warga dapat mendukung pemantauan mangrove jika peluang pengamatan dan ketepatan klasifikasi dikalibrasi.",
        },
        {
          isCorrect: false,
          label:
            "Kesalahan klasifikasi membuat seluruh data relawan tidak memiliki nilai ilmiah.",
        },
        {
          isCorrect: false,
          label: "Daerah tanpa laporan pasti tidak memiliki bibit mangrove.",
        },
        {
          isCorrect: false,
          label:
            "Peta publik akan memisahkan laporan, intensitas pengamatan, dan validasi.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
