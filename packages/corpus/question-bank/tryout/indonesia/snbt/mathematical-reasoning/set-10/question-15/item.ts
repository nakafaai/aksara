import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "hydroponic-nutrient",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Mencampur $$50$$ liter larutan $$1{.}600\\text{ ppm}$$ dengan $$150$$ liter larutan $$1{.}100\\text{ ppm}$$ menghasilkan larutan yang sesuai untuk tanaman minggu kelima.",
        },
        {
          column: 2,
          label:
            "Jika tandon diisi $$200$$ liter larutan $$600\\text{ ppm}$$ untuk tanaman minggu pertama lalu dibiarkan tanpa tambahan, setelah satu perubahan harian konsentrasinya lebih tinggi daripada $$600\\text{ ppm}$$.",
        },
        {
          column: 1,
          label:
            "Menambahkan $$100\\text{ ml}$$ stok A dan $$100\\text{ ml}$$ stok B ke dalam $$160$$ liter larutan menaikkan konsentrasinya sebesar $$125\\text{ ppm}$$.",
        },
        {
          column: 1,
          label:
            "Larutan $$1{.}200\\text{ ppm}$$ sebanyak $$150$$ liter menjadi sesuai untuk tanaman minggu ketiga jika ditambah air bersih sampai tandon penuh.",
        },
      ],
    },
  },
};

export default item;
