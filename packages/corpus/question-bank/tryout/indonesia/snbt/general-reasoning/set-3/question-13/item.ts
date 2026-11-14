import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "negation",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Ada relawan yang absen pada apel pagi, tetapi posko tidak dibuka tepat waktu atau ada relawan yang tidak mendapat jatah makan siang.",
        },
        {
          correct: false,
          label:
            "Tidak ada relawan yang absen pada apel pagi, tetapi posko tidak dibuka tepat waktu dan ada relawan yang tidak mendapat jatah makan siang.",
        },
        {
          correct: false,
          label:
            "Tidak ada relawan yang absen pada apel pagi, tetapi posko tidak dibuka tepat waktu atau semua relawan tidak mendapat jatah makan siang.",
        },
        {
          correct: false,
          label:
            "Jika ada relawan yang absen pada apel pagi, maka posko tidak dibuka tepat waktu atau ada relawan yang tidak mendapat jatah makan siang.",
        },
        {
          correct: true,
          label:
            "Tidak ada relawan yang absen pada apel pagi, tetapi posko tidak dibuka tepat waktu atau ada relawan yang tidak mendapat jatah makan siang.",
        },
      ],
    },
  },
};

export default item;
