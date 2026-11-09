import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "character",
  },
  stimulus: "radio-repair",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "menyembunyikan kegagalannya dengan memutar rekaman seolah-olah siaran asli",
        },
        {
          correct: false,
          label:
            "acuh tak acuh karena pelanggan kiosnya makin sedikit dari hari ke hari",
        },
        {
          correct: true,
          label:
            "jujur tentang apa yang tidak bisa ia pulihkan, tetapi tetap memenuhi maksud gadis itu",
        },
        {
          correct: false,
          label:
            "mudah menyerah ketika mengetahui bahwa stasiun radio itu sudah lama berhenti bersiaran",
        },
        {
          correct: false,
          label:
            "mungkin ingin membeli radio itu karena mengenali merek dan tahun pembuatannya",
        },
      ],
    },
  },
};

export default item;
