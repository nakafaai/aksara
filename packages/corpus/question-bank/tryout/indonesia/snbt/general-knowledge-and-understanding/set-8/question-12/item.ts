import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "sentence-meaning",
    topic: "referent",
  },
  stimulus: "rumput",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "pengolahan karagenan di pabrik",
        },
        {
          correct: true,
          label: "budi daya rumput laut pada tali yang diuraikan sebelumnya",
        },
        {
          correct: false,
          label: "pembuatan pasta gigi dan kosmetik",
        },
        {
          correct: false,
          label: "penjemuran hasil panen sampai kering",
        },
        {
          correct: false,
          label: "pembelian rumput laut kering oleh para pengepul di pesisir",
        },
      ],
    },
  },
};

export default item;
