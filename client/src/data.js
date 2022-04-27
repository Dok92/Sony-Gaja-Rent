import rent from "./assets/cover-store.png";
// import coverNetflix from "./assets/cover-netflix.png";
// import avatar from "./assets/profile-avatar.jfif";
import avatar from "./assets/user-1.jpg";
import coverSpotify from "./assets/cover-spotify.png";
// import coverDisney from "./assets/cover-disney.png";
// import allGames from "./assets/all-games.jpg";
import buttonsBlack from "./assets/buttons-black.jpg";
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
    // label: <Avatar />,
    profile: true,
    bg: charWitcherDarkBottom,
    // title: "Profil",
    // text: "Watch movies, TV shows and more with Netflix on PS5, streaming the latest original programming.",
    href: "/profile", 

  },
  // editProfile: {
  //   cover: coverSpotify,
  //   label: "izmeni profil",
  //   bg: charWitcher,
  //   title: "Spotify",
  //   href: "/edit-profile", 
  // }
};

export const Rent = {
  rent: {
    cover: rent,
    label: "Iznajmljivanje",
    bg: two,
    title: "Be greater. Be yourself.",
    text:
      "Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.", 
    href: "/rent", 
    pricing: true
  },  
  ps5: {
    cover: ps5Cover,
    label: "PS-5",
    bg: ps5Back,
    title: "PS-5",
    text: "Hunt for loot and don legendary armor sets in a new looter-slasher for PlayStation 5.",
    // order5: true,
    renting: true,
    href: "/ps5" 
  },
  ps4: {
    cover: ps4Cover,
    label: "PS-4",
    bg: ps4Back,
    title: "PS-4",
    text: "Take Sackboy on an epic 3D platordering adventure with your friends.",
    // order4: true,
    renting: true,
    href: "/ps4" 
  },
};

// export default Rent;
