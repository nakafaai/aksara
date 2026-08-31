import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
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
          label: "Bei Flutaufnahmen blieb die Übereinstimmung geringer.",
        },
        {
          isCorrect: false,
          label:
            "Bürgerdaten können das Mangrovenmonitoring unterstützen, wenn Beobachtungsmöglichkeit und Klassifikationsgenauigkeit kalibriert werden.",
        },
        {
          isCorrect: true,
          label:
            "Kalibrierung ordnet Bürgerbeiträge einer überprüfbaren Unsicherheit zu.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
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
          label: "Agreement remained lower for high-tide photographs.",
        },
        {
          isCorrect: false,
          label:
            "Community data can support mangrove monitoring when observation opportunity and classification accuracy are calibrated.",
        },
        {
          isCorrect: true,
          label:
            "Calibration places community contributions within measurable uncertainty.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
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
          label: "Kesepakatan pada foto saat air pasang tetap lebih rendah.",
        },
        {
          isCorrect: false,
          label:
            "Data warga dapat mendukung pemantauan mangrove jika peluang pengamatan dan ketepatan klasifikasi dikalibrasi.",
        },
        {
          isCorrect: true,
          label:
            "Kalibrasi menempatkan kontribusi warga dalam ukuran ketidakpastian yang dapat diperiksa.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
