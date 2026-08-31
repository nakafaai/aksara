import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Das Team wiederholte den Versuch mit folgender Änderung, um belastbarere Belege zu erhalten: einen nach Absagen aktualisierten digitalen Plan.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wiederholte den Test von ein nach Ausfällen aktualisierter digitaler Zeitplan erneut, um stärkere Belege als zuvor zu erhalten.",
        },
        {
          isCorrect: false,
          label:
            "Um stärkere Belege zu erhalten, wurde der Test von ein nach Ausfällen aktualisierter digitaler Zeitplan vom Team erneut wiederholt.",
        },
        {
          isCorrect: false,
          label:
            "Das Team führte eine weitere Wiederholung des Tests von ein nach Ausfällen aktualisierter digitaler Zeitplan für stärkere Belege durch.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wiederholte den Test, um stärkere Belege zu ein nach Ausfällen aktualisierter digitaler Zeitplan zu erhalten, die es bereits getestet hatte.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "The team repeated the test of a digital schedule updated after cancellations to obtain stronger evidence.",
        },
        {
          isCorrect: false,
          label:
            "The team repeated the test of a digital schedule updated after cancellations again to obtain evidence that was stronger than before.",
        },
        {
          isCorrect: false,
          label:
            "To obtain stronger evidence, the test of a digital schedule updated after cancellations was repeated again by the team.",
        },
        {
          isCorrect: false,
          label:
            "The team carried out another repetition of the test of a digital schedule updated after cancellations for stronger evidence.",
        },
        {
          isCorrect: false,
          label:
            "The team repeated the test to obtain stronger evidence about a digital schedule updated after cancellations, which it had already tested.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Tim mengulang uji jadwal digital yang diperbarui setelah pembatalan untuk memperoleh bukti yang lebih kuat.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengulang kembali uji jadwal digital yang diperbarui setelah pembatalan untuk memperoleh bukti yang lebih kuat daripada sebelumnya.",
        },
        {
          isCorrect: false,
          label:
            "Untuk memperoleh bukti lebih kuat, uji jadwal digital yang diperbarui setelah pembatalan diulang kembali oleh tim.",
        },
        {
          isCorrect: false,
          label:
            "Tim melakukan pengulangan lain atas uji jadwal digital yang diperbarui setelah pembatalan demi bukti yang lebih kuat.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengulang uji untuk memperoleh bukti lebih kuat tentang jadwal digital yang diperbarui setelah pembatalan yang telah diuji sebelumnya.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
