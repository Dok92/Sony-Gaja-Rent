import rent from "./assets/cover-store.png";
import avatar from "./assets/user-1.jpg";
import charWitcherDarkBottom from "./assets/char-witcherFront-dark-bottom.jpg";
import ps4Bg from "./assets/ps4/ps4-background.jpg";
import ps4Cover from "./assets/ps4/ps4-cover-60.png";
import ps5Bg from "./assets/ps5/playstation-5-background.webp"; 
import ps5Cover from "./assets/ps5/ps5-60.png";
import rentBg from "./assets/miles-morales.jpg"
import platinumCover from "./assets/trophies/platinum-cover.png";
import buttonsBlack from "./assets/buttons-black.jpg";

export const Profile = {
  profile: {
    cover: avatar,
    profile: true,
    bg: charWitcherDarkBottom,
    href: "/profile", 
  },
  trophies: {
    cover: platinumCover,
    label: "trofeji",
    bg: buttonsBlack,
    href: "/trophies", 
    trophies: true
  },
  // editProfile: {
  //   cover: editUser,
  //   label: "izmeni profil",
  //   bg: buttonsBlack,
  //   href: "/edit-profile", 
  // },
};

export const Rent = {
  rent: {
    cover: rent,
    label: "Iznajmljivanje",
    bg: rentBg,
    title: "Budi dosledan. Iznajmljuj PS kod nas.",
    text: "Budi naša verna mušterija, osvoji trofeje i ostvari dodatne pogodnosti, popuste i ponude. Poruci dva puta kod nas i osvoji bronzani trofej nakon kojeg te ceka 20% popusta na sledece iznajmljivanje.", 
    href: "/rent", 
    // pricing: true
  },  
  ps5: {
    cover: ps5Cover,
    label: "PS-5",
    bg: ps5Bg,
    title: "Playstation 5",
    text: "Uz svaku konzolu ide 15+ igara. U slucaju da Vas neka igra posebno zanima, slobodno nam naglasite.",
    // order5: true,
    renting: true,
    href: "/ps5" 
  },
  ps4: {
    cover: ps4Cover,
    label: "PS-4",
    bg: ps4Bg,
    title: "Playstation 4",
    text: "Iznajmljivanje sony ps pro sa ps + za online igranje",
    // order4: true,
    renting: true,
    href: "/ps4" 
  },
};