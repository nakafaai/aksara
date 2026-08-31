import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Das Team wiederholte den Versuch mit folgender Änderung, um belastbarere Belege zu erhalten: Genre-Schilder auf jedem Tisch.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wiederholte den Test von Genreschilder auf jedem Tisch erneut, um stärkere Belege als zuvor zu erhalten.",
        },
        {
          isCorrect: false,
          label:
            "Um stärkere Belege zu erhalten, wurde der Test von Genreschilder auf jedem Tisch vom Team erneut wiederholt.",
        },
        {
          isCorrect: false,
          label:
            "Das Team führte eine weitere Wiederholung des Tests von Genreschilder auf jedem Tisch für stärkere Belege durch.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wiederholte den Test, um stärkere Belege zu Genreschilder auf jedem Tisch zu erhalten, die es bereits getestet hatte.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "The team repeated the test of genre signs on each table to obtain stronger evidence.",
        },
        {
          isCorrect: false,
          label:
            "The team repeated the test of genre signs on each table again to obtain evidence that was stronger than before.",
        },
        {
          isCorrect: false,
          label:
            "To obtain stronger evidence, the test of genre signs on each table was repeated again by the team.",
        },
        {
          isCorrect: false,
          label:
            "The team carried out another repetition of the test of genre signs on each table for stronger evidence.",
        },
        {
          isCorrect: false,
          label:
            "The team repeated the test to obtain stronger evidence about genre signs on each table, which it had already tested.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Tim mengulang uji tanda genre di setiap meja untuk memperoleh bukti yang lebih kuat.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengulang kembali uji tanda genre di setiap meja untuk memperoleh bukti yang lebih kuat daripada sebelumnya.",
        },
        {
          isCorrect: false,
          label:
            "Untuk memperoleh bukti lebih kuat, uji tanda genre di setiap meja diulang kembali oleh tim.",
        },
        {
          isCorrect: false,
          label:
            "Tim melakukan pengulangan lain atas uji tanda genre di setiap meja demi bukti yang lebih kuat.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengulang uji untuk memperoleh bukti lebih kuat tentang tanda genre di setiap meja yang telah diuji sebelumnya.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
