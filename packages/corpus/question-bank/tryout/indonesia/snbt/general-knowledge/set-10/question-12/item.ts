import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Jede Produktionsstufe muss vollständig auf die Vorderseite jeder Packung gedruckt werden.",
        },
        {
          isCorrect: true,
          label:
            "Rückverfolgbarkeit verbindet ein Produkt mit aktuellen Aufzeichnungen über seinen Weg und nicht nur mit einem Ort.",
        },
        {
          isCorrect: false,
          label:
            "Mit einem Code müssen Lieferantendaten nicht mehr aktualisiert werden.",
        },
        {
          isCorrect: false,
          label:
            "Der Maniok wurde im Dorf Rawa geschnitten und in der Stadt frittiert.",
        },
        {
          isCorrect: false,
          label:
            "Für Rückverfolgbarkeit genügt die Adresse des letzten Händlers ohne Aufzeichnungen früherer Stufen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Every production stage must be printed in full on the front of every package.",
        },
        {
          isCorrect: true,
          label:
            "Traceability links a product to an updated record of its journey, not merely to a location.",
        },
        {
          isCorrect: false,
          label:
            "Once a code exists, supplier records no longer need updating.",
        },
        {
          isCorrect: false,
          label:
            "The cassava was sliced in Rawa Village and fried in the city.",
        },
        {
          isCorrect: false,
          label:
            "Traceability only needs to connect a product to its last distributor's address without records of earlier stages.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Semua tahap produksi harus dicetak lengkap di bagian depan setiap kemasan.",
        },
        {
          isCorrect: true,
          label:
            "Ketertelusuran menghubungkan produk dengan catatan perjalanan yang terus diperbarui, bukan hanya sebuah lokasi.",
        },
        {
          isCorrect: false,
          label:
            "Jika kode tersedia, catatan pemasok tidak perlu lagi diperbarui.",
        },
        {
          isCorrect: false,
          label: "Singkong diiris di Desa Rawa dan digoreng di kota.",
        },
        {
          isCorrect: false,
          label:
            "Ketertelusuran cukup menghubungkan produk dengan alamat distributor terakhir tanpa catatan tahap sebelumnya.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
