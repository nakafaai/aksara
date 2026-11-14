import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "library-fines",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Jika keterlambatan sebuah buku biasa bertambah $$1$$ hari, dendanya selalu naik paling banyak $$\\text{Rp}1{.}000{,}00$$.",
        },
        {
          column: 1,
          label:
            "Ada banyak hari keterlambatan $$d$$ yang membuat denda satu buku referensi yang terlambat $$d$$ hari tepat $$2$$ kali denda satu buku biasa yang juga terlambat $$d$$ hari, dengan kedua denda itu bukan nol.",
        },
        {
          column: 2,
          label:
            "Buku biasa yang dipinjam tanggal $$25$$ Januari dan dikembalikan tanggal $$12$$ Februari tanpa perpanjangan tidak didenda.",
        },
        {
          column: 2,
          label:
            "Peminjam yang memperpanjang sebuah buku referensi lalu mengembalikannya $$12$$ hari sesudah batas pengembalian awalnya membayar total $$\\text{Rp}8{.}000{,}00$$ untuk biaya perpanjangan dan denda buku itu.",
        },
      ],
    },
  },
};

export default item;
