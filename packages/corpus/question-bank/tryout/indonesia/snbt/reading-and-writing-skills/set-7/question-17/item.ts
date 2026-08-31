import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Das Team wiederholte den Versuch mit folgender Änderung, um belastbarere Belege zu erhalten: einen Rückgabecode an jedem Griff.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wiederholte den Test von ein Rückgabecode an jedem Griff erneut, um stärkere Belege als zuvor zu erhalten.",
        },
        {
          isCorrect: false,
          label:
            "Um stärkere Belege zu erhalten, wurde der Test von ein Rückgabecode an jedem Griff vom Team erneut wiederholt.",
        },
        {
          isCorrect: false,
          label:
            "Das Team führte eine weitere Wiederholung des Tests von ein Rückgabecode an jedem Griff für stärkere Belege durch.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wiederholte den Test, um stärkere Belege zu ein Rückgabecode an jedem Griff zu erhalten, die es bereits getestet hatte.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "The team repeated the test of a return code on each handle to obtain stronger evidence.",
        },
        {
          isCorrect: false,
          label:
            "The team repeated the test of a return code on each handle again to obtain evidence that was stronger than before.",
        },
        {
          isCorrect: false,
          label:
            "To obtain stronger evidence, the test of a return code on each handle was repeated again by the team.",
        },
        {
          isCorrect: false,
          label:
            "The team carried out another repetition of the test of a return code on each handle for stronger evidence.",
        },
        {
          isCorrect: false,
          label:
            "The team repeated the test to obtain stronger evidence about a return code on each handle, which it had already tested.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Tim mengulang uji kode pengembalian pada setiap gagang untuk memperoleh bukti yang lebih kuat.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengulang kembali uji kode pengembalian pada setiap gagang untuk memperoleh bukti yang lebih kuat daripada sebelumnya.",
        },
        {
          isCorrect: false,
          label:
            "Untuk memperoleh bukti lebih kuat, uji kode pengembalian pada setiap gagang diulang kembali oleh tim.",
        },
        {
          isCorrect: false,
          label:
            "Tim melakukan pengulangan lain atas uji kode pengembalian pada setiap gagang demi bukti yang lebih kuat.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengulang uji untuk memperoleh bukti lebih kuat tentang kode pengembalian pada setiap gagang yang telah diuji sebelumnya.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
