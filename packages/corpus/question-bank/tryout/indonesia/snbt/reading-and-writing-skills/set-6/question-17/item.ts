import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team wiederholte den Test von ein Beispiel zur Erfassung der Geräuschdauer erneut, um stärkere Belege als zuvor zu erhalten.",
        },
        {
          isCorrect: true,
          label:
            "Das Team wiederholte den Versuch mit folgender Änderung, um belastbarere Belege zu erhalten: ein Beispiel zur Erfassung der Geräuschdauer.",
        },
        {
          isCorrect: false,
          label:
            "Um stärkere Belege zu erhalten, wurde der Test von ein Beispiel zur Erfassung der Geräuschdauer vom Team erneut wiederholt.",
        },
        {
          isCorrect: false,
          label:
            "Das Team führte eine weitere Wiederholung des Tests von ein Beispiel zur Erfassung der Geräuschdauer für stärkere Belege durch.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wiederholte den Test, um stärkere Belege zu ein Beispiel zur Erfassung der Geräuschdauer zu erhalten, die es bereits getestet hatte.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The team repeated the test of an example showing how to record sound duration again to obtain evidence that was stronger than before.",
        },
        {
          isCorrect: true,
          label:
            "The team repeated the test of an example showing how to record sound duration to obtain stronger evidence.",
        },
        {
          isCorrect: false,
          label:
            "To obtain stronger evidence, the test of an example showing how to record sound duration was repeated again by the team.",
        },
        {
          isCorrect: false,
          label:
            "The team carried out another repetition of the test of an example showing how to record sound duration for stronger evidence.",
        },
        {
          isCorrect: false,
          label:
            "The team repeated the test to obtain stronger evidence about an example showing how to record sound duration, which it had already tested.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim mengulang kembali uji contoh cara mencatat durasi suara untuk memperoleh bukti yang lebih kuat daripada sebelumnya.",
        },
        {
          isCorrect: true,
          label:
            "Tim mengulang uji contoh cara mencatat durasi suara untuk memperoleh bukti yang lebih kuat.",
        },
        {
          isCorrect: false,
          label:
            "Untuk memperoleh bukti lebih kuat, uji contoh cara mencatat durasi suara diulang kembali oleh tim.",
        },
        {
          isCorrect: false,
          label:
            "Tim melakukan pengulangan lain atas uji contoh cara mencatat durasi suara demi bukti yang lebih kuat.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengulang uji untuk memperoleh bukti lebih kuat tentang contoh cara mencatat durasi suara yang telah diuji sebelumnya.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
