import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Die Meldenden beim Fundbüro gaben kurze Rückmeldungen.",
        },
        {
          isCorrect: false,
          label:
            "Die Meldenden beim Fundbüro gaben kurze Rückmeldungen, die nicht lang waren.",
        },
        {
          isCorrect: false,
          label:
            "Die Meldenden beim Fundbüro gaben kurze Rückmeldungen als Personen, die sich beim Fundbüro meldeten.",
        },
        {
          isCorrect: false,
          label:
            "Die Meldenden beim Fundbüro gaben kurze Rückmeldungen in kurzer Form.",
        },
        {
          isCorrect: false,
          label:
            "Die Meldenden beim Fundbüro gaben kurze Rückmeldungen, also Rückmeldungen von geringer Länge.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "The lost-property reporters gave brief comments.",
        },
        {
          isCorrect: false,
          label:
            "The lost-property reporters gave brief comments that were not long.",
        },
        {
          isCorrect: false,
          label:
            "The lost-property reporters gave brief comments as people reporting lost property.",
        },
        {
          isCorrect: false,
          label:
            "The lost-property reporters gave brief comments in a brief form.",
        },
        {
          isCorrect: false,
          label:
            "The lost-property reporters gave brief comments, meaning comments that were short.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Pelapor barang hilang memberikan komentar singkat.",
        },
        {
          isCorrect: false,
          label:
            "Pelapor barang hilang memberikan komentar singkat yang tidak panjang.",
        },
        {
          isCorrect: false,
          label:
            "Pelapor barang hilang memberikan komentar singkat sebagai pelapor yang melaporkan barang hilang.",
        },
        {
          isCorrect: false,
          label:
            "Pelapor barang hilang memberikan komentar singkat dalam bentuk yang singkat.",
        },
        {
          isCorrect: false,
          label:
            "Pelapor barang hilang memberikan komentar singkat, yaitu komentar yang pendek.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
