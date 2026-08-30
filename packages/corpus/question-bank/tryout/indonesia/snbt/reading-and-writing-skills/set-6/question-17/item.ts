import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team wiederholte erneut noch einmal den Versuch zu ein Beispiel zur Erfassung der Geräuschdauer, um belastbarere Belege zu erhalten.",
        },
        {
          isCorrect: false,
          label:
            "Das Team führte eine Wiederholung des Versuchs zu ein Beispiel zur Erfassung der Geräuschdauer mit dem Ziel durch, damit belastbarere Belege erhalten werden können.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wiederholte den Versuch zu ein Beispiel zur Erfassung der Geräuschdauer, um sehr viel belastbarere stärkere Belege zu erhalten.",
        },
        {
          isCorrect: false,
          label:
            "Eine Wiederholung wurde vom Team erneut für ein Beispiel zur Erfassung der Geräuschdauer durchgeführt, und zwar für Belege.",
        },
        {
          isCorrect: true,
          label:
            "Das Team wiederholte den Versuch mit folgender Änderung, um belastbarere Belege zu erhalten: ein Beispiel zur Erfassung der Geräuschdauer.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The team repeated the test of an example showing how to record sound duration again once more to obtain stronger evidence.",
        },
        {
          isCorrect: false,
          label:
            "The team carried out a repetition of the test of an example showing how to record sound duration for the purpose of being able to obtain evidence that was stronger.",
        },
        {
          isCorrect: false,
          label:
            "The team repeated the test of an example showing how to record sound duration to obtain very much stronger and more strong evidence.",
        },
        {
          isCorrect: false,
          label:
            "A repetition was repeated by the team for an example showing how to record sound duration in order for evidence.",
        },
        {
          isCorrect: true,
          label:
            "The team repeated the test of an example showing how to record sound duration to obtain stronger evidence.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim mengulang kembali lagi uji contoh cara mencatat durasi suara untuk memperoleh bukti yang lebih kuat.",
        },
        {
          isCorrect: false,
          label:
            "Tim melakukan pengulangan atas uji contoh cara mencatat durasi suara dengan tujuan agar supaya dapat memperoleh bukti yang lebih kuat.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengulang uji contoh cara mencatat durasi suara untuk memperoleh bukti yang lebih sangat kuat sekali.",
        },
        {
          isCorrect: false,
          label:
            "Pengulangan kembali dilakukan lagi oleh tim atas contoh cara mencatat durasi suara untuk bukti.",
        },
        {
          isCorrect: true,
          label:
            "Tim mengulang uji contoh cara mencatat durasi suara untuk memperoleh bukti yang lebih kuat.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
