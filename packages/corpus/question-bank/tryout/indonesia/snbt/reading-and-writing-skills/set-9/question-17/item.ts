import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Das Team wird den Versuch mit dem Digitalplan wiederholen, um belastbarere Belege zu erhalten.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wird den Versuch mit dem Digitalplan erneut wiederholen, um belastbarere Belege als zuvor zu erhalten.",
        },
        {
          isCorrect: false,
          label:
            "Um belastbarere Belege zu erhalten, wird der Versuch mit dem Digitalplan vom Team erneut wiederholt werden.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wird eine Tätigkeit durchführen, nämlich die Wiederholung des Versuchs mit dem Digitalplan, um belastbarere Belege zu erhalten.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wird den Versuch wiederholen, um belastbarere Belege zu dem Digitalplan zu erhalten, den es bereits getestet hat.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "The team will repeat the test of the digital schedule to obtain stronger evidence.",
        },
        {
          isCorrect: false,
          label:
            "The team will repeat the test of the digital schedule again to obtain evidence that is stronger than before.",
        },
        {
          isCorrect: false,
          label:
            "To obtain stronger evidence, the test of the digital schedule will be repeated again by the team.",
        },
        {
          isCorrect: false,
          label:
            "The team will carry out the activity of repeating the test of the digital schedule to obtain stronger evidence.",
        },
        {
          isCorrect: false,
          label:
            "The team will repeat the test to obtain stronger evidence about the digital schedule that it has already tested.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Tim akan mengulang uji jadwal digital setelah pembatalan untuk memperoleh bukti yang lebih kuat.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan mengulang kembali uji jadwal digital setelah pembatalan untuk memperoleh bukti yang lebih kuat daripada sebelumnya.",
        },
        {
          isCorrect: false,
          label:
            "Untuk memperoleh bukti yang lebih kuat, uji jadwal digital setelah pembatalan akan diulang kembali oleh tim.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan melakukan kegiatan berupa pengulangan uji jadwal digital setelah pembatalan demi memperoleh bukti yang lebih kuat.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan mengulang uji untuk memperoleh bukti yang lebih kuat tentang jadwal digital setelah pembatalan yang telah diuji sebelumnya.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
