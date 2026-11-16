import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "polymers",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "18 kg, because one water molecule leaves for each repeat unit" },
        { correct: true, label: "36 kg, because each repeat unit forms two amide links, each giving off one water molecule" },
        { correct: false, label: "No water forms, because nylon-6,6 is an addition polymer" },
        { correct: false, label: "72 kg, because four water molecules leave for each repeat unit" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "18 kg, kerana satu molekul air keluar bagi setiap unit berulang" },
        { correct: true, label: "36 kg, kerana setiap unit berulang membentuk dua rangkaian amida, masing-masing membebaskan satu molekul air" },
        { correct: false, label: "Tiada air terbentuk, kerana nilon-6,6 ialah polimer penambahan" },
        { correct: false, label: "72 kg, kerana empat molekul air keluar bagi setiap unit berulang" },
      ],
    },
  },
};

export default item;
