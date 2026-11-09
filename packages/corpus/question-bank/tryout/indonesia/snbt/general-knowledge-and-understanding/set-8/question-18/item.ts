import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "inference",
  },
  stimulus: "gambut",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Kebakaran gambut pasti sudah padam ketika api di permukaan tidak terlihat lagi.",
        },
        {
          column: 1,
          label:
            "Mencegah kebakaran gambut lebih hemat biaya daripada memadamkannya.",
        },
        {
          column: 2,
          label:
            "Asap kebakaran gambut hanya berdampak pada daerah di sekitar lahan yang terbakar.",
        },
        {
          column: 1,
          label:
            "Sekat kanal yang jebol dapat membuat gambut di sekitarnya kembali kering.",
        },
      ],
    },
  },
};

export default item;
