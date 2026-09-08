import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team wird den Test der Bildkarten erneut wiederholen, um stärkere Belege als zuvor zu erhalten.",
        },
        {
          isCorrect: true,
          label:
            "Das Team wird den Test der Bildkarten wiederholen, um stärkere Belege zu erhalten.",
        },
        {
          isCorrect: false,
          label:
            "Um stärkere Belege zu erhalten, wird der Test der Bildkarten vom Team erneut wiederholt werden.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wird für stärkere Belege eine erneute Wiederholung des Tests der Bildkarten durchführen.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wird den bereits zuvor durchgeführten Test der Bildkarten wiederholen, um stärkere Belege zu erhalten.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The team will repeat the illustrated-card test again to obtain evidence that is stronger than before.",
        },
        {
          isCorrect: true,
          label:
            "The team will repeat the illustrated-card test to obtain stronger evidence.",
        },
        {
          isCorrect: false,
          label:
            "To obtain stronger evidence, the illustrated-card test will be repeated again by the team.",
        },
        {
          isCorrect: false,
          label:
            "The team will carry out a repetition of the illustrated-card test again for stronger evidence.",
        },
        {
          isCorrect: false,
          label:
            "The team will repeat the illustrated-card test that it has already tested to obtain stronger evidence.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim akan mengulang kembali uji kartu bergambar untuk memperoleh bukti yang lebih kuat daripada sebelumnya.",
        },
        {
          isCorrect: true,
          label:
            "Tim akan mengulang uji kartu bergambar untuk memperoleh bukti yang lebih kuat.",
        },
        {
          isCorrect: false,
          label:
            "Untuk memperoleh bukti lebih kuat, uji kartu bergambar akan diulang kembali oleh tim.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan melakukan pengulangan kembali atas uji kartu bergambar demi bukti yang lebih kuat.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan mengulang uji kartu bergambar yang sebelumnya sudah diuji untuk memperoleh bukti lebih kuat.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
