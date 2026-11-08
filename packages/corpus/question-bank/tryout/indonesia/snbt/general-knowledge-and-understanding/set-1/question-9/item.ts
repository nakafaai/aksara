import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "conclusion",
  },
  stimulus: "elektronik",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pengolahan oleh pengepul kecil tidak menghasilkan keuntungan sehingga perlu diganti.",
        },
        {
          correct: false,
          label:
            "Fasilitas pengolahan yang aman akan berjalan baik selama peralatannya memadai.",
        },
        {
          correct: false,
          label:
            "Bahaya pengolahan sampah elektronik hanya dirasakan oleh para pekerjanya.",
        },
        {
          correct: true,
          label:
            "Pengolahan sampah elektronik yang aman memerlukan pemilahan, fasilitas penangkap bahan berbahaya, dan sistem pengumpulan dari warga.",
        },
        {
          correct: false,
          label:
            "Pemilahan komponen sejak awal sudah cukup untuk membuat seluruh proses pengolahan sampah elektronik menjadi aman bagi pekerja dan warga.",
        },
      ],
    },
  },
};

export default item;
