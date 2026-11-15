import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "character",
  },
  stimulus: "last-newsstand",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Bu Sri memercayai Pak Harun dalam urusan uang.",
        },
        {
          correct: false,
          label: "Pak Harun tidak lagi mampu membayar nasi uduk itu.",
        },
        {
          correct: true,
          label:
            "Nasi uduk itu diberikan sebagai pemberian, bukan dijual kepada Pak Harun.",
        },
        {
          correct: false,
          label:
            "Bu Sri menitipkan uang receh sebagai ganti uang nasi uduk yang tidak diterimanya.",
        },
        {
          correct: true,
          label:
            "Kebiasaan menyodorkan dan menolak uang itu terjadi berulang, bukan hanya sekali.",
        },
      ],
    },
  },
};

export default item;
