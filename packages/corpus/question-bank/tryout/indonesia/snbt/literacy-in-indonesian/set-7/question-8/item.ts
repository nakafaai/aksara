import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "text-structure",
  },
  stimulus: "tide-poem",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "menunjukkan bahwa ketepatan ukuran waktu tidak sama dengan kemampuan mengetahui kapan harus bertindak",
        },
        {
          correct: false,
          label:
            "menunjukkan bahwa kehidupan di kota lebih teratur dan lebih tepat waktu daripada kehidupan di kampung nelayan",
        },
        {
          correct: false,
          label:
            "menunjukkan bahwa aku sudah melupakan ayahnya sejak pindah ke kota yang tidak punya laut",
        },
        {
          correct: false,
          label:
            "menunjukkan bahwa ponsel lebih berguna bagi nelayan daripada tanda-tanda langit dan lumpur",
        },
        {
          correct: false,
          label:
            "menunjukkan bahwa aku menyesal tidak menjadi nelayan seperti ayahnya di kampung",
        },
      ],
    },
  },
};

export default item;
