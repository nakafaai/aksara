import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-idea",
  },
  stimulus: "thomas-cup-1958",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Indonesia merebut Piala Thomas 1958 pada keikutsertaan pertamanya dengan mengalahkan Malaya, juara yang selalu menang sejak 1949.",
        },
        {
          correct: false,
          label:
            "Kemenangan 1958 menjadi kebanggaan nasional, karena negara yang belum lama merdeka mengalahkan juara bertahan dengan aturan yang sama bagi semua.",
        },
        {
          correct: true,
          label:
            "Kemenangan 1958 bukan hanya buah semangat, tetapi juga hasil pembinaan klub yang sudah lama berjalan, dan tradisi klub itu terus melahirkan pemain sesudahnya.",
        },
        {
          correct: false,
          label:
            "Klub-klub bulu tangkis di Bandung, Jakarta, dan Surabaya dihidupi iuran anggota dan dukungan pengusaha setempat serta menggelar kompetisi rutin.",
        },
        {
          correct: false,
          label:
            "Cerita bahwa Indonesia menang hanya dengan semangat memang menyentuh, tetapi menyembunyikan sesuatu.",
        },
      ],
    },
  },
};

export default item;
