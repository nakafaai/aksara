import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "parallel-reasoning",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pengelola perpustakaan memilih secara acak $$100$$ dari $$2{.}000$$ anggotanya. Karena $$60\\%$$ dari mereka meminjam buku setiap bulan, ia menyimpulkan bahwa sekitar $$60\\%$$ anggota perpustakaan meminjam buku setiap bulan.",
        },
        {
          correct: false,
          label:
            "Pengelola kantin sekolah menanyai $$100$$ pembeli pertama pada Senin pagi. Karena $$70\\%$$ dari mereka membeli nasi uduk, ia menyimpulkan bahwa sekitar $$70\\%$$ siswa sekolah itu menyukai nasi uduk.",
        },
        {
          correct: false,
          label:
            "Pengurus koperasi membagikan angket yang boleh diisi siapa saja. Karena $$56$$ dari $$70$$ anggota yang mengisi merasa puas, ia melaporkan bahwa $$80\\%$$ pengisi angket merasa puas.",
        },
        {
          correct: false,
          label:
            "Sebuah klinik memilih secara acak $$200$$ pasiennya. Karena $$30\\%$$ dari mereka menderita darah tinggi, klinik itu menyimpulkan bahwa sekitar $$30\\%$$ penduduk kota menderita darah tinggi.",
        },
        {
          correct: true,
          label:
            "Sebuah stasiun radio mengajak pendengarnya menelepon untuk menilai sebuah acara. Karena $$85\\%$$ penelepon menyukai acara itu, stasiun radio menyimpulkan bahwa sekitar $$85\\%$$ dari seluruh pendengarnya menyukai acara itu.",
        },
      ],
    },
  },
};

export default item;
