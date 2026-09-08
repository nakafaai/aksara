import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team wird den Versuch mit der Aufnahmecheckliste erneut wiederholen, um belastbarere Belege als zuvor zu erhalten.",
        },
        {
          isCorrect: false,
          label:
            "Um belastbarere Belege zu erhalten, wird der Versuch mit der Aufnahmecheckliste vom Team erneut wiederholt werden.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wird eine Tätigkeit durchführen, nämlich die Wiederholung des Versuchs mit der Aufnahmecheckliste, um belastbarere Belege zu erhalten.",
        },
        {
          isCorrect: true,
          label:
            "Das Team wird den Versuch mit der Aufnahmecheckliste wiederholen, um belastbarere Belege zu erhalten.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wird den Versuch wiederholen, um belastbarere Belege zu der Aufnahmecheckliste zu erhalten, die es bereits getestet hat.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The team will repeat the recording-checklist test again to obtain evidence that is stronger than before.",
        },
        {
          isCorrect: false,
          label:
            "To obtain stronger evidence, the recording-checklist test will be repeated again by the team.",
        },
        {
          isCorrect: false,
          label:
            "The team will carry out the activity of repeating the recording-checklist test to obtain stronger evidence.",
        },
        {
          isCorrect: true,
          label:
            "The team will repeat the recording-checklist test to obtain stronger evidence.",
        },
        {
          isCorrect: false,
          label:
            "The team will repeat the test to obtain stronger evidence about the recording checklist that it has already tested.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim akan mengulang kembali uji daftar pemeriksaan sebelum merekam untuk memperoleh bukti yang lebih kuat daripada sebelumnya.",
        },
        {
          isCorrect: false,
          label:
            "Untuk memperoleh bukti yang lebih kuat, uji daftar pemeriksaan sebelum merekam akan diulang kembali oleh tim.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan melakukan kegiatan berupa pengulangan uji daftar pemeriksaan sebelum merekam demi memperoleh bukti yang lebih kuat.",
        },
        {
          isCorrect: true,
          label:
            "Tim akan mengulang uji daftar pemeriksaan sebelum merekam untuk memperoleh bukti yang lebih kuat.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan mengulang uji untuk memperoleh bukti yang lebih kuat tentang daftar pemeriksaan sebelum merekam yang telah diuji sebelumnya.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
