import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "character",
  },
  stimulus: "lighthouse-keeper",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        { column: 1, label: "Biasanya Pak Darsa ikut menurunkan muatan kapal pembawa beras dan minyak tanah." },
        { column: 1, label: "Sebelum lampu baru dipasang, penjaga harus naik beberapa kali dalam satu malam agar lensa tetap berputar." },
        { column: 2, label: "Pada malam terakhirnya, Pak Darsa menulis catatan jaga dengan huruf yang lebih tergesa daripada biasanya." },
        { column: 1, label: "Isi kolom paling kanan buku catatan jaga tidak termasuk laporan yang diminta kantor di kota." },
      ],
    },
  },
};

export default item;
