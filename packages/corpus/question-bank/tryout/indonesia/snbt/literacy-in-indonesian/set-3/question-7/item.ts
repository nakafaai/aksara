import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "cause-effect",
  },
  stimulus: "sugar-tax",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Gula dalam minuman lebih cepat merusak gigi daripada gula dalam makanan.",
        },
        {
          correct: true,
          label:
            "Minuman manis tidak membuat kenyang sehingga porsi makan jarang dikurangi.",
        },
        {
          correct: false,
          label:
            "Gula dalam minuman kemasan selalu berasal dari pemanis buatan.",
        },
        {
          correct: false,
          label:
            "Minuman manis harganya lebih murah daripada makanan yang sama manisnya.",
        },
        {
          correct: false,
          label: "Gula dalam minuman tidak tercantum pada label kemasan.",
        },
      ],
    },
  },
};

export default item;
