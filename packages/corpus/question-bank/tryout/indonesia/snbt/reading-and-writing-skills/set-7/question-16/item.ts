import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Ausleihenden der Schirme gaben kurze Rückmeldungen, die nicht lang waren.",
        },
        {
          isCorrect: false,
          label:
            "Die Ausleihenden der Schirme gaben kurze Rückmeldungen als Personen, die Schirme ausliehen.",
        },
        {
          isCorrect: false,
          label:
            "Die Ausleihenden der Schirme gaben kurze Rückmeldungen in kurzer Form.",
        },
        {
          isCorrect: true,
          label: "Die Ausleihenden der Schirme gaben kurze Rückmeldungen.",
        },
        {
          isCorrect: false,
          label:
            "Die Ausleihenden der Schirme gaben kurze Rückmeldungen, also Rückmeldungen von geringer Länge.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The umbrella borrowers gave brief comments that were not long.",
        },
        {
          isCorrect: false,
          label:
            "The umbrella borrowers gave brief comments as borrowers who borrowed umbrellas.",
        },
        {
          isCorrect: false,
          label: "The umbrella borrowers gave brief comments in a brief form.",
        },
        {
          isCorrect: true,
          label: "The umbrella borrowers gave brief comments.",
        },
        {
          isCorrect: false,
          label:
            "The umbrella borrowers gave brief comments, meaning comments that were short.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Peminjam payung memberikan komentar singkat yang tidak panjang.",
        },
        {
          isCorrect: false,
          label:
            "Peminjam payung memberikan komentar singkat sebagai peminjam yang meminjam payung.",
        },
        {
          isCorrect: false,
          label:
            "Peminjam payung memberikan komentar singkat dalam bentuk yang singkat.",
        },
        {
          isCorrect: true,
          label: "Peminjam payung memberikan komentar singkat.",
        },
        {
          isCorrect: false,
          label:
            "Peminjam payung memberikan komentar singkat, yaitu komentar yang pendek.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
