import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Nicht: der Raum geprüft wird.",
        },
        {
          isCorrect: false,
          label: "Nicht: die Kaution freigegeben wird.",
        },
        {
          isCorrect: true,
          label: "die Kaution freigegeben wird",
        },
        {
          isCorrect: false,
          label: "der Raum geprüft wird",
        },
        {
          isCorrect: false,
          label: "Nicht: der Schlüssel zurückgegeben wird.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "It is not true that the room is inspected.",
        },
        {
          isCorrect: false,
          label: "It is not true that the deposit is released.",
        },
        {
          isCorrect: true,
          label: "the deposit is released",
        },
        {
          isCorrect: false,
          label: "the room is inspected",
        },
        {
          isCorrect: false,
          label: "It is not true that the key is returned.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Tidak benar bahwa ruangan diperiksa.",
        },
        {
          isCorrect: false,
          label: "Tidak benar bahwa deposit dikembalikan.",
        },
        {
          isCorrect: true,
          label: "deposit dikembalikan",
        },
        {
          isCorrect: false,
          label: "ruangan diperiksa",
        },
        {
          isCorrect: false,
          label: "Tidak benar bahwa kunci dikembalikan.",
        },
      ],
    },
  },
};

export default item;
