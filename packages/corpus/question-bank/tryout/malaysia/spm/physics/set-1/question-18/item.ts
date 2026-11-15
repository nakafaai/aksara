import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "light-and-optics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The ray leaves into the air because the angle of incidence at the side face is about $$35^\\circ$$",
        },
        {
          correct: false,
          label:
            "The ray leaves into the air at an angle of refraction of $$60^\\circ$$ because the side of the block is parallel to the original ray",
        },
        {
          correct: false,
          label:
            "Total internal reflection occurs because the angle of incidence at the side face is about $$30^\\circ$$",
        },
        {
          correct: true,
          label:
            "Total internal reflection occurs because the angle of incidence at the side face is about $$55^\\circ$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Sinar keluar ke udara kerana sudut tuju di permukaan sisi kira-kira $$35^\\circ$$",
        },
        {
          correct: false,
          label:
            "Sinar keluar ke udara dengan sudut biasan $$60^\\circ$$ kerana sisi blok selari dengan arah sinar asal",
        },
        {
          correct: false,
          label:
            "Pantulan dalam penuh berlaku kerana sudut tuju di permukaan sisi kira-kira $$30^\\circ$$",
        },
        {
          correct: true,
          label:
            "Pantulan dalam penuh berlaku kerana sudut tuju di permukaan sisi kira-kira $$55^\\circ$$",
        },
      ],
    },
  },
};

export default item;
