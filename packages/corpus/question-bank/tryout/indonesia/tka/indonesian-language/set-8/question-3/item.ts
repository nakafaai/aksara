import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "daily-relevance",
  },
  stimulus: "sea-sasi",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "memberi waktu bagi suatu sumber daya untuk pulih sebelum dimanfaatkan lagi",
        },
        {
          correct: false,
          label:
            "mengambil hasil alam sebanyak-banyaknya sebelum orang lain datang",
        },
        {
          correct: false,
          label: "membuat aturan bersama tanpa melibatkan warga yang terdampak",
        },
        {
          correct: false,
          label: "menghapus sanksi agar semua orang bebas memanen kapan saja",
        },
        {
          correct: false,
          label: "menjual seluruh hasil alam kepada orang dari luar daerah",
        },
      ],
    },
  },
};

export default item;
