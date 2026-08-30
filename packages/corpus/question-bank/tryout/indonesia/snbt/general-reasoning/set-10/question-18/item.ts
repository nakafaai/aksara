import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Nicht: ein Sitzplatz reserviert wird.",
        },
        {
          isCorrect: false,
          label: "Nicht: ein Zugangscode gesendet wird.",
        },
        {
          isCorrect: false,
          label: "ein Sitzplatz reserviert wird",
        },
        {
          isCorrect: false,
          label: "Nicht: die Einladung angenommen wird.",
        },
        {
          isCorrect: true,
          label: "ein Zugangscode gesendet wird",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "It is not true that a seat is reserved.",
        },
        {
          isCorrect: false,
          label: "It is not true that an access code is sent.",
        },
        {
          isCorrect: false,
          label: "a seat is reserved",
        },
        {
          isCorrect: false,
          label: "It is not true that the invitation is accepted.",
        },
        {
          isCorrect: true,
          label: "an access code is sent",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Tidak benar bahwa kursi dipesan.",
        },
        {
          isCorrect: false,
          label: "Tidak benar bahwa kode akses dikirim.",
        },
        {
          isCorrect: false,
          label: "kursi dipesan",
        },
        {
          isCorrect: false,
          label: "Tidak benar bahwa undangan diterima.",
        },
        {
          isCorrect: true,
          label: "kode akses dikirim",
        },
      ],
    },
  },
};

export default item;
