import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-supporting-ideas",
  },
  stimulus: "oil-soap",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "jelantah dapat langsung dipakai sebagai sabun tanpa diolah",
        },
        {
          correct: false,
          label: "sabun dari jelantah dapat dipakai sehari setelah dibuat",
        },
        {
          correct: true,
          label:
            "pembuatan sabun dari jelantah melalui beberapa tahap yang menuntut kehati-hatian",
        },
        {
          correct: false,
          label: "arang dipakai untuk mengeraskan sabun di dalam cetakan",
        },
        {
          correct: false,
          label: "larutan soda api aman disentuh dengan tangan",
        },
      ],
    },
  },
};

export default item;
