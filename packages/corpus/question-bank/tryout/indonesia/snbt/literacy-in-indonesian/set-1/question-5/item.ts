import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "sleep-memory",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Dina akan menguasai kedua materi sama baiknya karena tidur mengolah semua informasi yang ia temui hari itu.",
        },
        {
          correct: false,
          label:
            "Ingatan Dina tentang materi sejarah akan melemah karena hipokampus memindahkannya ke neokorteks.",
        },
        {
          correct: false,
          label:
            "Tidur tidak berpengaruh pada materi sejarah karena Dina mempelajarinya pada sore hari, bukan menjelang tidur.",
        },
        {
          correct: false,
          label:
            "Dina sebaiknya begadang membaca materi geografi agar materi itu ikut dikonsolidasi malam itu.",
        },
        {
          correct: true,
          label:
            "Ingatan sejarahnya cenderung lebih bertahan daripada jika ia begadang, tetapi tidur tidak membantunya menguasai geografi.",
        },
      ],
    },
  },
};

export default item;
