import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "text-structure",
  },
  stimulus: "old-translator",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Paragraf itu menunjukkan bahwa Pak Sastro penerjemah yang kurang berhasil, dan bagian yang bergantung padanya adalah keraguannya menerjemahkan surat terakhir.",
        },
        {
          correct: false,
          label:
            'Paragraf itu menjelaskan alasan Dita meminta terjemahan, dan bagian yang bergantung padanya adalah ucapan Dita, "Biar aku bisa kenal Eyang Putri."',
        },
        {
          correct: false,
          label:
            "Paragraf itu membangun pembanding bahwa memilih padanan biasanya mudah, dan bagian yang bergantung padanya adalah usul Dita tentang kata sukses.",
        },
        {
          correct: false,
          label:
            "Paragraf itu membangun pembanding bahwa memilih padanan biasanya mudah, dan bagian yang bergantung padanya adalah terjemahan kalimat kalung yang dibuat kata demi kata.",
        },
        {
          correct: true,
          label:
            'Paragraf itu membangun pembanding bahwa memilih padanan biasanya mudah, dan bagian yang bergantung padanya adalah kalimat "Kali ini tidak." di awal paragraf ketiga.',
        },
      ],
    },
  },
};

export default item;
