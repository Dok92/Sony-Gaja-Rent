import { Rent, Profile } from "../../data.js"; 

export const menuPrimary = [
  {
    label: "Rent",
    url: "/rent",
    content: [
      {
        app: Rent.rent,
      },
      {
        app: Rent.ps5,     
      },     
      {
        app: Rent.ps4,      
      },     
    ],
  },
  {
    label: "Profil",
    url: "/profile",
    content: [
      { app: Profile.profile },
      { app: Profile.trophies },
      // { app: Profile.editProfile },
    ], 
  },
];

export default menuPrimary;
