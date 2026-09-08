import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team wird den Versuch mit dem Ortsformular erneut wiederholen, um belastbarere Belege als zuvor zu erhalten.",
        },
        {
          isCorrect: false,
          label:
            "Um belastbarere Belege zu erhalten, wird der Versuch mit dem Ortsformular vom Team erneut wiederholt werden.",
        },
        {
          isCorrect: true,
          label:
            "Das Team wird den Versuch mit dem Ortsformular wiederholen, um belastbarere Belege zu erhalten.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wird eine Tätigkeit durchführen, nämlich die Wiederholung des Versuchs mit dem Ortsformular, um belastbarere Belege zu erhalten.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wird den Versuch wiederholen, um belastbarere Belege zu dem Ortsformular zu erhalten, das es bereits getestet hat.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The team will repeat the test of the location form again to obtain evidence that is stronger than before.",
        },
        {
          isCorrect: false,
          label:
            "To obtain stronger evidence, the test of the location form will be repeated again by the team.",
        },
        {
          isCorrect: true,
          label:
            "The team will repeat the test of the location form to obtain stronger evidence.",
        },
        {
          isCorrect: false,
          label:
            "The team will carry out the activity of repeating the test of the location form to obtain stronger evidence.",
        },
        {
          isCorrect: false,
          label:
            "The team will repeat the test to obtain stronger evidence about the location form that it has already tested.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim akan mengulang kembali uji formulir dengan pilihan lokasi terstruktur untuk memperoleh bukti yang lebih kuat daripada sebelumnya.",
        },
        {
          isCorrect: false,
          label:
            "Untuk memperoleh bukti yang lebih kuat, uji formulir dengan pilihan lokasi terstruktur akan diulang kembali oleh tim.",
        },
        {
          isCorrect: true,
          label:
            "Tim akan mengulang uji formulir dengan pilihan lokasi terstruktur untuk memperoleh bukti yang lebih kuat.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan melakukan kegiatan berupa pengulangan uji formulir dengan pilihan lokasi terstruktur demi memperoleh bukti yang lebih kuat.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan mengulang uji untuk memperoleh bukti yang lebih kuat tentang formulir dengan pilihan lokasi terstruktur yang telah diuji sebelumnya.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
