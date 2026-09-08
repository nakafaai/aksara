import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Besuchenden des Büchertauschmarkts gaben kurze Rückmeldungen, die nicht lang waren.",
        },
        {
          isCorrect: false,
          label:
            "Die Besuchenden des Büchertauschmarkts gaben kurze Rückmeldungen auf dem Büchertauschmarkt, den sie besuchten.",
        },
        {
          isCorrect: false,
          label:
            "Die Besuchenden des Büchertauschmarkts gaben kurze Rückmeldungen in kurzer Form.",
        },
        {
          isCorrect: true,
          label:
            "Die Besuchenden des Büchertauschmarkts gaben kurze Rückmeldungen.",
        },
        {
          isCorrect: false,
          label:
            "Die Besuchenden des Büchertauschmarkts gaben kurze Rückmeldungen, also Rückmeldungen von geringer Länge.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Visitors to the book exchange gave brief comments that were not long.",
        },
        {
          isCorrect: false,
          label:
            "Visitors to the book exchange gave brief comments at the book exchange they were visiting.",
        },
        {
          isCorrect: false,
          label:
            "Visitors to the book exchange gave brief comments in a brief form.",
        },
        {
          isCorrect: true,
          label: "Visitors to the book exchange gave brief comments.",
        },
        {
          isCorrect: false,
          label:
            "Visitors to the book exchange gave brief comments, meaning comments that were short.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pengunjung pasar tukar buku memberikan komentar singkat yang tidak panjang.",
        },
        {
          isCorrect: false,
          label:
            "Pengunjung pasar tukar buku memberikan komentar singkat di pasar tukar buku tempat mereka berkunjung.",
        },
        {
          isCorrect: false,
          label:
            "Pengunjung pasar tukar buku memberikan komentar singkat dalam bentuk yang singkat.",
        },
        {
          isCorrect: true,
          label: "Pengunjung pasar tukar buku memberikan komentar singkat.",
        },
        {
          isCorrect: false,
          label:
            "Pengunjung pasar tukar buku memberikan komentar yang singkat, yaitu komentar yang pendek.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
