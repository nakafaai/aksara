import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team wird den Versuch mit kleinen Karten samt Gehzeiten erneut wiederholen, um belastbarere Belege als zuvor zu erhalten.",
        },
        {
          isCorrect: false,
          label:
            "Um belastbarere Belege zu erhalten, wird der Versuch mit kleinen Karten samt Gehzeiten vom Team erneut wiederholt werden.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wird eine Tätigkeit durchführen, nämlich die Wiederholung des Versuchs mit kleinen Karten samt Gehzeiten, um belastbarere Belege zu erhalten.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wird den Versuch wiederholen, um belastbarere Belege zu kleinen Karten samt Gehzeiten zu erhalten, die es bereits getestet hat.",
        },
        {
          isCorrect: true,
          label:
            "Das Team wird den Versuch mit kleinen Karten samt Gehzeiten wiederholen, um belastbarere Belege zu erhalten.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The team will repeat the test of small maps showing walking times again to obtain evidence that is stronger than before.",
        },
        {
          isCorrect: false,
          label:
            "To obtain stronger evidence, the test of small maps showing walking times will be repeated again by the team.",
        },
        {
          isCorrect: false,
          label:
            "The team will carry out the activity of repeating the test of small maps showing walking times to obtain stronger evidence.",
        },
        {
          isCorrect: false,
          label:
            "The team will repeat the test to obtain stronger evidence about small maps showing walking times that it has already tested.",
        },
        {
          isCorrect: true,
          label:
            "The team will repeat the test of small maps showing walking times to obtain stronger evidence.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim akan mengulang kembali uji peta kecil dengan waktu tempuh untuk memperoleh bukti yang lebih kuat daripada sebelumnya.",
        },
        {
          isCorrect: false,
          label:
            "Untuk memperoleh bukti yang lebih kuat, uji peta kecil dengan waktu tempuh akan diulang kembali oleh tim.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan melakukan kegiatan berupa pengulangan uji peta kecil dengan waktu tempuh demi memperoleh bukti yang lebih kuat.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan mengulang uji untuk memperoleh bukti yang lebih kuat tentang peta kecil dengan waktu tempuh yang telah diuji sebelumnya.",
        },
        {
          isCorrect: true,
          label:
            "Tim akan mengulang uji peta kecil dengan waktu tempuh untuk memperoleh bukti yang lebih kuat.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
