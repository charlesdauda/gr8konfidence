import { preloadImage, prefetchImages } from "./preloadImages";

import HeroImge from "../assets/images/heroimg.png";

import KonfBrand from "../assets/images/bus1.png";
import CharlBrand from "../assets/images/bus2.png";
import ShirlBrand from "../assets/images/bus3.png";
import Fries from "../assets/images/post1.png";
import Eli from "../assets/images/post2.png";
import Youth from "../assets/images/event1.png";
import Dress from "../assets/images/event2.png";
import Codm from "../assets/images/event3.png";
import Dark from "../assets/images/event4.png";
import Pod from "../assets/images/bus4.png";
import KB from "../assets/images/post3.png";
import TFK from "../assets/images/post4.png";

import made1 from "../assets/images/made1.png";
import carterefe from "../assets/images/carterefe.png";
import themgotalk from "../assets/images/themgotalk.png";
import kev1 from "../assets/images/kev1.png";
import kweku from "../assets/images/kwewkuaddo.png";
import eli1 from "../assets/images/eli1.png";
import kai from "../assets/images/kaicenat.png";
import made2 from "../assets/images/made2.png";
import made3 from "../assets/images/made3.png";
import kev3 from "../assets/images/kev3.png";
import skai from "../assets/images/skai.png";
import kev2 from "../assets/images/kev2.png";

const WORK_IMAGES = [
  KonfBrand, CharlBrand, ShirlBrand, Fries, Eli,
  Youth, Dress, Codm, Dark, Pod, KB, TFK,
];

const STREAMER_IMAGES = [
  made1, carterefe, themgotalk, kev1, kweku,
  eli1, kai, made2, made3, kev3, skai, kev2,
];

export function preloadSiteImages(): void {
  // High priority for hero image
  preloadImage(HeroImge, "high");
  
  // Preload all streamer images with high priority since they're critical
  STREAMER_IMAGES.forEach(img => preloadImage(img, "high"));
  
  // Prefetch work images with lower priority
  prefetchImages(WORK_IMAGES);
}