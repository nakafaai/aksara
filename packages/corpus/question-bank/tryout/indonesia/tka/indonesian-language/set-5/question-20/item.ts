import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "emotional-response",
  },
  stimulus: "old-letter",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "kecewa karena Wulan tidak menulis tentang kemenangannya",
        },
        {
          correct: false,
          label: "kesal karena Wulan merusak buku perpustakaan",
        },
        {
          correct: true,
          label:
            "terharu karena Wulan membalas nasihat orang yang tidak dikenalnya dengan meneruskannya",
        },
        {
          correct: false,
          label: "khawatir karena surat itu akan disita petugas perpustakaan",
        },
        {
          correct: false,
          label:
            "bingung karena kalimat itu tidak berhubungan dengan surat Hasan",
        },
      ],
    },
  },
};

export default item;
