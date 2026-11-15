import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "default-choice",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        { column: 1, label: "Dalam penelitian 2003, persentase warga yang tercatat bersedia menjadi donor lebih tinggi di negara dengan sistem keluar." },
        { column: 2, label: "Mengganti sistem masuk menjadi sistem keluar pasti menambah jumlah transplantasi organ." },
        { column: 2, label: "Setelah pendaftaran otomatis, total iuran seluruh karyawan PT Sinar Mandiri, termasuk yang tidak ikut, turun." },
        { column: 2, label: "Karyawan yang tetap memakai iuran bawaan $$3\\%$$ pasti tidak membaca formulir pendaftarannya." },
      ],
    },
  },
};

export default item;
