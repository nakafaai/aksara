import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Das Team wird den Versuch mit Genre-Schildern wiederholen, um belastbarere Belege zu erhalten.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wird den Versuch mit Genre-Schildern erneut wiederholen, um belastbarere Belege als zuvor zu erhalten.",
        },
        {
          isCorrect: false,
          label:
            "Um belastbarere Belege zu erhalten, wird der Versuch mit Genre-Schildern vom Team erneut wiederholt werden.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wird eine Tätigkeit durchführen, nämlich die Wiederholung des Versuchs mit Genre-Schildern, um belastbarere Belege zu erhalten.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wird den Versuch wiederholen, um belastbarere Belege zu den Genre-Schildern zu erhalten, die es bereits getestet hat.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "The team will repeat the genre-sign test to obtain stronger evidence.",
        },
        {
          isCorrect: false,
          label:
            "The team will repeat the genre-sign test again to obtain evidence that is stronger than before.",
        },
        {
          isCorrect: false,
          label:
            "To obtain stronger evidence, the genre-sign test will be repeated again by the team.",
        },
        {
          isCorrect: false,
          label:
            "The team will carry out the activity of repeating the genre-sign test to obtain stronger evidence.",
        },
        {
          isCorrect: false,
          label:
            "The team will repeat the test to obtain stronger evidence about the genre signs that it has already tested.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Tim akan mengulang uji tanda genre untuk memperoleh bukti yang lebih kuat.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan mengulang kembali uji tanda genre untuk memperoleh bukti yang lebih kuat daripada sebelumnya.",
        },
        {
          isCorrect: false,
          label:
            "Untuk memperoleh bukti yang lebih kuat, uji tanda genre akan diulang kembali oleh tim.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan melakukan kegiatan berupa pengulangan uji tanda genre demi memperoleh bukti yang lebih kuat.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan mengulang uji untuk memperoleh bukti yang lebih kuat tentang tanda genre yang telah diuji sebelumnya.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
