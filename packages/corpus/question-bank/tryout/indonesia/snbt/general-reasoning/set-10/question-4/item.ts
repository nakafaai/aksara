import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Schlussfolgerung ist sicher, weil gleicher Regen immer dieselbe Vegetation erzeugt.",
        },
        {
          isCorrect: false,
          label:
            "Die Schlussfolgerung ist sicher falsch, weil in einer Wüste keine Vegetation wachsen kann.",
        },
        {
          isCorrect: false,
          label:
            "Die Schlussfolgerung ist irrelevant, weil der Text keinen Zusammenhang zwischen Regen und Vegetation nennt.",
        },
        {
          isCorrect: true,
          label:
            "Die Schlussfolgerung ist aufgrund der früheren Beobachtung plausibel, das Ergebnis aber nicht sicher.",
        },
        {
          isCorrect: false,
          label:
            "Es gibt keinen relevanten Beleg, weil der Text nach dem früheren Regen keine Vegetation beschreibt.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The conclusion is certain because the same rain always produces the same vegetation.",
        },
        {
          isCorrect: false,
          label:
            "The conclusion is certainly false because vegetation cannot grow in a desert.",
        },
        {
          isCorrect: false,
          label:
            "The conclusion is irrelevant because the passage gives no connection between rain and vegetation.",
        },
        {
          isCorrect: true,
          label:
            "The conclusion is plausible based on the earlier observation, but the outcome is not certain.",
        },
        {
          isCorrect: false,
          label:
            "There is no relevant evidence because the passage reports no vegetation after the earlier rain.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Simpulan pasti benar karena hujan yang sama selalu menghasilkan vegetasi yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Simpulan pasti salah karena vegetasi tidak mungkin tumbuh di gurun.",
        },
        {
          isCorrect: false,
          label:
            "Simpulan tidak relevan karena tidak ada hubungan antara hujan dan vegetasi dalam bacaan.",
        },
        {
          isCorrect: true,
          label:
            "Simpulan masuk akal berdasarkan pengamatan sebelumnya, tetapi hasilnya belum pasti.",
        },
        {
          isCorrect: false,
          label:
            "Tidak ada bukti yang relevan karena bacaan tidak melaporkan vegetasi setelah hujan sebelumnya.",
        },
      ],
    },
  },
};

export default item;
