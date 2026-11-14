import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "author-view",
  },
  stimulus: "pranata-mangsa",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pranata mangsa sudah usang karena dibuat jauh sebelum ada prakiraan cuaca modern.",
        },
        {
          correct: false,
          label:
            "Pranata mangsa sebaiknya diganti sepenuhnya oleh prakiraan resmi karena perubahan iklim membuat semua tandanya keliru.",
        },
        {
          correct: true,
          label:
            "Perubahan iklim terutama menggoyahkan bagian pranata mangsa yang bertumpu pada keteraturan tanggal, sedangkan kebiasaan mengamati alam tetap berguna.",
        },
        {
          correct: false,
          label:
            "Pranata mangsa tetap dapat diandalkan karena tanda-tandanya sudah dibakukan sejak 1855.",
        },
        {
          correct: false,
          label:
            "Pranata mangsa hanya tidak cocok di luar Jawa bagian tengah, sedangkan di tempat asalnya tidak terpengaruh perubahan iklim.",
        },
      ],
    },
  },
};

export default item;
