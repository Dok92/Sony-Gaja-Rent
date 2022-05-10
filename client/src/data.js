import rent from "./assets/cover-store.png";
// import coverNetflix from "./assets/cover-netflix.png";
// import avatar from "./assets/profile-avatar.jfif";
import avatar from "./assets/user-1.jpg";
import editUser from "./assets/edit-user.png";
// import coverDisney from "./assets/cover-disney.png";
// import allGames from "./assets/all-games.jpg";
import buttonsBlack from "./assets/buttons-black.jpg";
import platinumCover from "./assets//trophies//platinum-cover.png";
// import charSkyrim from "./assets/char-skyrimFront.jpg";
// import charWitcher from "./assets/char-witcherFront.jpg";
import charWitcher from "./assets/char-witcherFront-darker.jpg";
import charWitcherDarkBottom from "./assets/char-witcherFront-dark-bottom.jpg";
import ps4Back from "./assets/ps4/ps4-accessories.jpg";
// import ps4BackWhiteShort from "./assets/ps4/ps4-white-bg-short.webp";
// import ps4Cover from "./assets/ps4/ps4-cover.png";
import ps4Cover from "./assets/ps4/ps4-cover-60.png";
import ps5Back from "./assets/ps5/playstation-5-background.webp"; 
// import ps5Cover from "./assets/ps5/ps5-cover.png";
import ps5Cover from "./assets/ps5/ps5-60.png";
// import one from "./assets/tryout/spidy-short.jpg";
// import oneLong from "./assets/tryout/spidy-long.jpg";
import two from "./assets/tryout/miles-morales.jpg"
// import three from "./assets/tryout/mortal-kombat-2021-movies-scorpion-sub-zero-black-2560x1440-4712.jpg"
import Avatar from "./components/Avatar";

export const Profile = {
  profile: {
    cover: avatar,
    profile: true,
    bg: charWitcherDarkBottom,
    href: "/profile", 
  },
  editProfile: {
    cover: editUser,
    label: "izmeni profil",
    bg: buttonsBlack,
    href: "/edit-profile", 
  },
  trophies: {
    cover: platinumCover,
    label: "trofeji",
    bg: buttonsBlack,
    href: "/trophies", 
  }
};

export const Rent = {
  rent: {
    cover: rent,
    label: "Iznajmljivanje",
    bg: two,
    title: "Budi dosledan. Iznajmljuj PS kod nas.",
    text: "Budi naša verna mušterija, osvoji trofeje i ostvari dodatne pogodnosti, popuste i ponude. Poruci dva puta kod nas i osvoji bronzani trofej nakon kojeg te ceka 20% popusta na sledece iznajmljivanje.", 
    href: "/rent", 
    // pricing: true
  },  
  ps5: {
    cover: ps5Cover,
    label: "PS-5",
    bg: ps5Back,
    title: "Playstation 5",
    text: "Uz svaku konzolu ide 15+ igara. U slucaju da Vas neka igra posebno zanima, slobodno nam naglasite.",
    // order5: true,
    renting: true,
    href: "/ps5" 
  },
  ps4: {
    cover: ps4Cover,
    label: "PS-4",
    bg: ps4Back,
    title: "Playstation 4",
    text: "Iznajmljivanje sony ps pro sa ps + za online igranje",
    // order4: true,
    renting: true,
    href: "/ps4" 
  },
};

// export default Rent;
