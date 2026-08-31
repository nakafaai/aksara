import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "während des Versuchstags schrittweise erhöht",
        },
        {
          isCorrect: false,
          label: "erst nach Bekanntwerden des Versuchsergebnisses erfasst",
        },
        {
          isCorrect: false,
          label: "nur in der Vergleichsbedingung verändert",
        },
        {
          isCorrect: false,
          label: "ignoriert, weil sie das Ergebnis nicht beeinflussen konnten",
        },
        {
          isCorrect: true,
          label:
            "gleich gehalten, damit sich die geprüfte Änderung klarer deuten ließ",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "increased gradually during the trial day",
        },
        {
          isCorrect: false,
          label: "recorded only after the trial result was known",
        },
        {
          isCorrect: false,
          label: "changed only in the comparison condition",
        },
        {
          isCorrect: false,
          label: "ignored because they could not affect the result",
        },
        {
          isCorrect: true,
          label:
            "kept the same so that the tested change could be interpreted more clearly",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "ditambah secara bertahap selama hari uji",
        },
        {
          isCorrect: false,
          label: "dicatat setelah hasil uji diketahui",
        },
        {
          isCorrect: false,
          label: "diganti hanya pada kondisi pembanding",
        },
        {
          isCorrect: false,
          label: "diabaikan karena tidak berkaitan dengan hasil",
        },
        {
          isCorrect: true,
          label:
            "dijaga tetap sama agar pengaruh perubahan lebih mudah ditafsirkan",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
