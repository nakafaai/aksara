import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Penurunan denda minimum akan mempersulit pengembalian kerugian negara.",
        },
        {
          correct: false,
          label:
            "Ketentuan yang lebih ringan akan mengurangi efek jera dan mempersulit pengembalian kerugian negara.",
        },
        {
          correct: false,
          label: "Sejumlah ketentuan lebih ringan daripada UU Tipikor.",
        },
        {
          correct: false,
          label:
            "Ketentuan yang lebih ringan diperkirakan akan mengurangi efek jera dan membuat korupsi semakin marak.",
        },
        {
          correct: true,
          label:
            "Sejumlah ketentuan lebih ringan daripada UU Tipikor dan korupsi di Indonesia akan berkurang.",
        },
      ],
    },
  },
};

export default item;
