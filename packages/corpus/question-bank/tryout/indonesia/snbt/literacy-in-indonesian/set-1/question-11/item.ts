import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-relation",
  },
  stimulus: "phone-ban",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$6$$ poin, karena SMA Pelita tidak melarang ponsel sehingga tidak dapat dijadikan pembanding",
        },
        {
          correct: false,
          label:
            "$$5$$ poin, yaitu kenaikan yang sama besar dengan kenaikan di SMA Pelita",
        },
        {
          correct: false,
          label:
            "sekitar $$1$$ poin, atau kira-kira seperlima dari kenaikan di SMA Harapan Bangsa",
        },
        {
          correct: true,
          label:
            "sekitar $$1$$ poin, atau kira-kira seperenam dari kenaikan di SMA Harapan Bangsa",
        },
        {
          correct: false,
          label:
            "sekitar $$2$$ poin, karena nilai awal SMA Pelita $$2$$ poin lebih tinggi",
        },
      ],
    },
  },
};

export default item;
