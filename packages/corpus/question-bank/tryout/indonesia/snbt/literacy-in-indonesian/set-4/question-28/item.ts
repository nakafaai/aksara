import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "figurative-language",
  },
  stimulus: "tin-roof",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Radio di rumah itu sudah rusak sehingga siarannya tidak dapat didengar.",
        },
        {
          correct: false,
          label:
            "Bunyi tetesan air terdengar lebih merdu daripada lagu-lagu di radio.",
        },
        {
          correct: false,
          label:
            "Ayah tidak suka mendengarkan berita apa pun yang disiarkan radio.",
        },
        {
          correct: true,
          label:
            "Kenyataan yang dialami sendiri lebih dapat dipercaya daripada janji.",
        },
        {
          correct: false,
          label:
            "Hujan malam itu sudah diramalkan dengan tepat oleh siaran radio.",
        },
      ],
    },
  },
};

export default item;
