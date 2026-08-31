import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team wiederholte den Test von ein Formular mit strukturierten Ortsangaben erneut, um stärkere Belege als zuvor zu erhalten.",
        },
        {
          isCorrect: false,
          label:
            "Um stärkere Belege zu erhalten, wurde der Test von ein Formular mit strukturierten Ortsangaben vom Team erneut wiederholt.",
        },
        {
          isCorrect: true,
          label:
            "Das Team wiederholte den Versuch mit folgender Änderung, um belastbarere Belege zu erhalten: ein Formular mit strukturierten Ortsangaben.",
        },
        {
          isCorrect: false,
          label:
            "Das Team führte eine weitere Wiederholung des Tests von ein Formular mit strukturierten Ortsangaben für stärkere Belege durch.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wiederholte den Test, um stärkere Belege zu ein Formular mit strukturierten Ortsangaben zu erhalten, die es bereits getestet hatte.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The team repeated the test of a form with structured location choices again to obtain evidence that was stronger than before.",
        },
        {
          isCorrect: false,
          label:
            "To obtain stronger evidence, the test of a form with structured location choices was repeated again by the team.",
        },
        {
          isCorrect: true,
          label:
            "The team repeated the test of a form with structured location choices to obtain stronger evidence.",
        },
        {
          isCorrect: false,
          label:
            "The team carried out another repetition of the test of a form with structured location choices for stronger evidence.",
        },
        {
          isCorrect: false,
          label:
            "The team repeated the test to obtain stronger evidence about a form with structured location choices, which it had already tested.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim mengulang kembali uji formulir dengan pilihan lokasi terstruktur untuk memperoleh bukti yang lebih kuat daripada sebelumnya.",
        },
        {
          isCorrect: false,
          label:
            "Untuk memperoleh bukti lebih kuat, uji formulir dengan pilihan lokasi terstruktur diulang kembali oleh tim.",
        },
        {
          isCorrect: true,
          label:
            "Tim mengulang uji formulir dengan pilihan lokasi yang terstruktur untuk memperoleh bukti yang lebih kuat.",
        },
        {
          isCorrect: false,
          label:
            "Tim melakukan pengulangan lain atas uji formulir dengan pilihan lokasi terstruktur demi bukti yang lebih kuat.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengulang uji untuk memperoleh bukti lebih kuat tentang formulir dengan pilihan lokasi terstruktur yang telah diuji sebelumnya.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
