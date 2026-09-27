import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Penurunan denda minimum akan mempersulit pengembalian kerugian negara.",
        },
        {
          isCorrect: false,
          label:
            "Ketentuan yang lebih ringan akan mengurangi efek jera dan mempersulit pengembalian kerugian negara.",
        },
        {
          isCorrect: false,
          label: "Sejumlah ketentuan lebih ringan daripada UU Tipikor.",
        },
        {
          isCorrect: false,
          label:
            "Ketentuan yang lebih ringan diperkirakan akan mengurangi efek jera dan membuat korupsi semakin marak.",
        },
        {
          isCorrect: true,
          label:
            "Sejumlah ketentuan lebih ringan daripada UU Tipikor dan korupsi di Indonesia akan berkurang.",
        },
      ],
    },
  },
};

export default item;
