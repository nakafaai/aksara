import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "bystander-effect",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            'Seorang panitia menulis bahwa "ribuan" orang menghadiri acaranya, padahal hanya sekitar $$500$$ orang, lalu memakai angka itu untuk meminta gedung yang lebih besar.',
        },
        {
          correct: true,
          label:
            'Berita tentang turis yang "dikerubungi puluhan pedagang", padahal rekaman hanya menunjukkan $$3$$ pedagang, dipakai sebagai bukti bahwa pedagang di kota wisata itu tidak ramah.',
        },
        {
          correct: false,
          label:
            "Seorang warga yang dompetnya benar-benar dicopet di sebuah terminal menyimpulkan bahwa semua terminal di negeri itu penuh pencopet dan tidak aman bagi siapa pun.",
        },
        {
          correct: false,
          label:
            "Sebuah percobaan laboratorium menemukan bahwa orang lebih jarang menolong ketika ada orang lain, lalu disimpulkan bahwa setiap kerumunan di jalan berbahaya bagi korban.",
        },
        {
          correct: false,
          label:
            "Sebuah rekaman utuh menunjukkan beberapa orang diam saja ketika seorang pejalan kaki terjatuh, lalu disimpulkan bahwa orang-orang dalam rekaman itu tidak menolong saat itu.",
        },
      ],
    },
  },
};

export default item;
