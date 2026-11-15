import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "figurative-language",
  },
  stimulus: "village-midwife",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Udin sudah menunggu dengan ambulans di seberang jembatan sejak magrib.",
        },
        {
          correct: false,
          label:
            "Nia menemukan surat rujukan yang sudah ditandatangani Bu Warsih di dalam laci.",
        },
        {
          correct: true,
          label:
            'Mak Rosnah berdiri sebelum Rahmat sempat bicara dan berkata, "Bawa istrimu. Aku ikut."',
        },
        {
          correct: false,
          label:
            "Bu Warsih menyerahkan surat rujukan kepada Nia dan memintanya mengantar Sumi.",
        },
        {
          correct: false,
          label:
            "Rahmat masuk ke poskesdes dengan basah kuyup dan napas terengah-engah.",
        },
      ],
    },
  },
};

export default item;
