import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "das gesamte Programm vor dem Ausprobieren ablehnten",
        },
        {
          isCorrect: false,
          label: "darauf warteten, dass das Team das Programmziel änderte",
        },
        {
          isCorrect: false,
          label: "das gewünschte Endergebnis der Organisation nicht kannten",
        },
        {
          isCorrect: true,
          label:
            "nicht sicher waren, welche Handlung auf den aktuellen Schritt folgen sollte",
        },
        {
          isCorrect: false,
          label: "einen anderen Schritt zur Prüfung einer Hypothese auswählten",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "rejected the entire programme before trying it",
        },
        {
          isCorrect: false,
          label: "waited for staff to change the programme's goal",
        },
        {
          isCorrect: false,
          label: "did not know the final outcome desired by the organisers",
        },
        {
          isCorrect: true,
          label: "was unsure which action should follow the current stage",
        },
        {
          isCorrect: false,
          label: "chose a different step in order to test a hypothesis",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "menolak seluruh program sebelum mencobanya",
        },
        {
          isCorrect: false,
          label: "menunggu petugas mengubah tujuan program",
        },
        {
          isCorrect: false,
          label: "tidak mengetahui hasil akhir yang diinginkan pengelola",
        },
        {
          isCorrect: true,
          label:
            "belum yakin tindakan yang harus dilakukan setelah tahap saat ini",
        },
        {
          isCorrect: false,
          label: "memilih langkah berbeda untuk menguji hipotesis",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
