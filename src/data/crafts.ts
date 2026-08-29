import rogan from "@/assets/rogan.jpg";
import molela from "@/assets/molela.jpg";
import lac from "@/assets/lac.jpg";
import bluePottery from "@/assets/bluepottery.jpg";

export type CraftStatus = "Endangered" | "Critically Rare" | "Vulnerable" | "Reviving";

export type Craft = {
  id: string;
  name: string;
  origin: string;
  tagline: string;
  status: CraftStatus;
  image: string;
  accent: "warm" | "sun" | "leaf";
  history: string;
  materials: string[];
  steps: { title: string; description: string }[];
};

export const crafts: Craft[] = [
  {
    id: "rogan-art",
    name: "Rogan Art",
    origin: "Nirona & Rajasthan trade routes",
    tagline: "Boiled castor oil paint drawn into fabric without ever touching it.",
    status: "Critically Rare",
    image: rogan,
    accent: "warm",
    history:
      "Rogan is a 300-year-old painting practice where castor oil is boiled for hours until it turns into a thick, elastic paste. Artisans pick up a thread of this paste with a metal stylus and stretch it mid-air onto cloth, folding the fabric to mirror the motif. Once practised by many families across western India, it now survives with only a handful of households, making every tree-of-life panel a small act of preservation.",
    materials: ["Castor oil", "Natural pigments", "Metal stylus", "Cotton cloth", "Chalk powder"],
    steps: [
      {
        title: "Prepare the rogan paste",
        description:
          "Slowly boil castor oil for close to twelve hours until it thickens, then cool it in cold water to form a stretchy residue.",
      },
      {
        title: "Mix your colours",
        description:
          "Blend the paste with natural pigment powders — crimson, gold, indigo — kneading until the colour is even and glossy.",
      },
      {
        title: "Draw in the air",
        description:
          "Lift a fine thread of paint with the stylus and lay it onto the cloth without letting the tool touch the fabric.",
      },
      {
        title: "Fold to mirror",
        description:
          "Gently fold the cloth in half so the wet motif prints its own mirror image, completing the symmetrical composition.",
      },
    ],
  },
  {
    id: "molela-terracotta",
    name: "Molela Terracotta",
    origin: "Molela village, Rajsamand, Rajasthan",
    tagline: "Hollow clay relief plaques of village deities, fired in open kilns.",
    status: "Endangered",
    image: molela,
    accent: "sun",
    history:
      "In the village of Molela near Udaipur, potter families have shaped votive terracotta plaques for generations. Unlike round pottery, these are flat relief panels carrying folk deities such as Dharamraj and Nagaraja, carried home by tribal pilgrims from Gujarat and Madhya Pradesh. The clay comes from a local pond, mixed with donkey dung and sand for strength, then sun-dried and fired in an open kiln.",
    materials: ["Pond clay", "Sand", "Organic binder", "Wooden tools", "Open kiln"],
    steps: [
      {
        title: "Prepare the clay body",
        description:
          "Soak pond clay overnight, then knead with sifted sand and organic fibre until it is smooth and crack-resistant.",
      },
      {
        title: "Roll the base slab",
        description:
          "Flatten the clay into an even rectangular slab — the backing plate on which the whole relief will be built.",
      },
      {
        title: "Build the relief",
        description:
          "Press coils and pellets of clay onto the slab to raise the deity, horse, and border motifs in gentle relief.",
      },
      {
        title: "Dry and fire",
        description:
          "Shade-dry for several days, then fire in an open kiln so the plaque turns its signature warm orange-red.",
      },
    ],
  },
  {
    id: "lac-bangles",
    name: "Lac Bangles",
    origin: "Jaipur & Jodhpur, Rajasthan",
    tagline: "Resin bangles warmed over coals and set with mirrors and stones.",
    status: "Vulnerable",
    image: lac,
    accent: "warm",
    history:
      "Lac, a resin secreted by tiny insects on host trees, has been shaped into Rajasthani bangles for centuries. The Manihar community heats lac sticks over coals until pliable, rolls them into rings on a wooden block, and embeds mirrors, kundan and coloured stones while the surface is still soft. Cheaper machine-made plastic has pushed many workshops out, though bridal demand keeps the craft flickering.",
    materials: ["Lac resin", "Coal brazier", "Mirror pieces", "Kundan stones", "Wooden roller"],
    steps: [
      {
        title: "Soften the lac",
        description:
          "Hold a stick of coloured lac over a low coal flame, rotating steadily until it becomes soft like warm dough.",
      },
      {
        title: "Roll the band",
        description:
          "Work the softened lac on a wooden block with a flat roller until it becomes an even cylindrical strip.",
      },
      {
        title: "Shape the circle",
        description:
          "Wrap the strip around a sized wooden mandrel, join the ends seamlessly, and smooth the seam with gentle heat.",
      },
      {
        title: "Set the ornament",
        description:
          "Press mirrors and stones into the still-warm surface, then cool and polish for the final glassy shine.",
      },
    ],
  },
  {
    id: "blue-pottery",
    name: "Blue Pottery",
    origin: "Jaipur, Rajasthan",
    tagline: "Cobalt-glazed ware made from quartz dough — with no clay at all.",
    status: "Reviving",
    image: bluePottery,
    accent: "leaf",
    history:
      "Jaipur's blue pottery arrived through Persian and Central Asian craft routes and was revived by Maharaja Ram Singh II in the 19th century. Its dough contains no clay: quartz powder, powdered glass, fuller's earth, borax and gum are pressed into moulds, dried, painted with cobalt oxide florals, glazed and low-fired. The fragile body makes it one of the hardest crafts to master, and only a few Jaipur workshops keep the recipe alive.",
    materials: ["Quartz powder", "Powdered glass", "Fuller's earth", "Cobalt oxide", "Glaze"],
    steps: [
      {
        title: "Knead the quartz dough",
        description:
          "Combine quartz powder, powdered glass, borax, gum and water into a pliable dough — no potter's clay involved.",
      },
      {
        title: "Press into moulds",
        description:
          "Press the dough into plaster moulds to form plates, vases and tiles, then leave them to dry in shade.",
      },
      {
        title: "Paint the motifs",
        description:
          "Sketch florals, birds and arabesques, then paint them with cobalt oxide diluted to the right depth of blue.",
      },
      {
        title: "Glaze and fire",
        description:
          "Dip the piece in a transparent glaze and fire at low temperature to reveal the glossy turquoise finish.",
      },
    ],
  },
];

export const getCraft = (id: string) => crafts.find((c) => c.id === id);

export const statusTone: Record<CraftStatus, string> = {
  "Critically Rare": "bg-coral text-coral-foreground",
  Endangered: "bg-primary text-primary-foreground",
  Vulnerable: "bg-mustard text-mustard-foreground",
  Reviving: "bg-forest text-forest-foreground",
};
