import { menLevelTwo } from "./levelTwo/menLevelTwo";
import { womenLevelTwo } from "./levelTwo/womenLevelTwo";
import { electronicsLevelTwo } from "./levelTwo/electronicsLevelTwo";
import { furnitureLevelTwo } from "./levelTwo/furnitureLevelTwo";

export const mainCategory = [
  {
    name: "Men",
    categoryId: "men",
    level: 1,
    levelTwoCategory: menLevelTwo,
  },

  {
    name: "Women",
    categoryId: "women",
    level: 1,
    levelTwoCategory: womenLevelTwo,
  },

  {
    name: "Electronics",
    categoryId: "electronics",
    level: 1,
    levelTwoCategory: electronicsLevelTwo,
  },

  {
    name: "Home & Furniture",
    categoryId: "home_and_furniture",
    level: 1,
    levelTwoCategory: furnitureLevelTwo,
  },
];
