import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "der Raum vorbereitet wird",
        },
        {
          isCorrect: false,
          label: "Nicht: die Reservierung bestätigt wird.",
        },
        {
          isCorrect: true,
          label: "die Veranstaltung beginnen kann",
        },
        {
          isCorrect: false,
          label: "Nicht: der Raum vorbereitet wird.",
        },
        {
          isCorrect: false,
          label: "Nicht: die Veranstaltung beginnen kann.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "the room is prepared",
        },
        {
          isCorrect: false,
          label: "It is not true that the reservation is confirmed.",
        },
        {
          isCorrect: true,
          label: "the event can begin",
        },
        {
          isCorrect: false,
          label: "It is not true that the room is prepared.",
        },
        {
          isCorrect: false,
          label: "It is not true that the event can begin.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "ruangan disiapkan",
        },
        {
          isCorrect: false,
          label: "Tidak benar bahwa reservasi dikonfirmasi.",
        },
        {
          isCorrect: true,
          label: "acara dapat dimulai",
        },
        {
          isCorrect: false,
          label: "Tidak benar bahwa ruangan disiapkan.",
        },
        {
          isCorrect: false,
          label: "Tidak benar bahwa acara dapat dimulai.",
        },
      ],
    },
  },
};

export default item;
