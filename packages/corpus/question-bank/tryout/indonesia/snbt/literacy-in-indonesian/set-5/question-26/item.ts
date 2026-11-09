import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "wayang-school",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Menghafalkan seluruh alur Mahabharata sebelum pelajaran dimulai.",
        },
        {
          correct: false,
          label:
            "Mengganti cerita lama dengan cerita yang sama sekali baru dan asing setiap minggu.",
        },
        {
          correct: true,
          label:
            "Menyisipkan persoalan murid lewat tokoh jenaka dalam cerita yang sudah dikenal.",
        },
        {
          correct: false,
          label:
            "Meminta murid menonton pertunjukan wayang semalam suntuk tanpa jeda.",
        },
        {
          correct: false,
          label:
            "Membacakan nasihat para raja dalam lakon wayang secara langsung di kelas.",
        },
      ],
    },
  },
};

export default item;
