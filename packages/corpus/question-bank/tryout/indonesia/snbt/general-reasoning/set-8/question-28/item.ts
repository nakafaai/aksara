import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "die Bestellung versendet wird",
        },
        {
          isCorrect: false,
          label: "Nicht: die Zahlung geprüft wird.",
        },
        {
          isCorrect: false,
          label: "Nicht: eine Quittung erstellt wird.",
        },
        {
          isCorrect: false,
          label: "Nicht: die Bestellung versendet wird.",
        },
        {
          isCorrect: false,
          label: "eine Quittung erstellt wird",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "the order is dispatched",
        },
        {
          isCorrect: false,
          label: "It is not true that the payment is verified.",
        },
        {
          isCorrect: false,
          label: "It is not true that a receipt is created.",
        },
        {
          isCorrect: false,
          label: "It is not true that the order is dispatched.",
        },
        {
          isCorrect: false,
          label: "a receipt is created",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "pesanan dikirim",
        },
        {
          isCorrect: false,
          label: "Tidak benar bahwa pembayaran diverifikasi.",
        },
        {
          isCorrect: false,
          label: "Tidak benar bahwa bukti pembayaran dibuat.",
        },
        {
          isCorrect: false,
          label: "Tidak benar bahwa pesanan dikirim.",
        },
        {
          isCorrect: false,
          label: "bukti pembayaran dibuat",
        },
      ],
    },
  },
};

export default item;
